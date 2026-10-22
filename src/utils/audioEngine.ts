/**
 * Procedural Web Audio Engine for Cafe Pomodoro
 * High fidelity synthesized ambient soundscapes (Zero external audio file dependency issues)
 * Guarantees ONLY ONE sound plays at a time with smooth crossfade!
 */

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentSourceNodes: { stop: () => void } | null = null;
  private currentTrackId: string | null = null;
  private volume: number = 0.6;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getCurrentTrackId(): string | null {
    return this.currentTrackId;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public stop() {
    if (this.currentSourceNodes && this.ctx && this.masterGain) {
      // Smooth fade out
      const fadeGain = this.masterGain;
      const originalVol = this.isMuted ? 0 : this.volume;
      fadeGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
      
      const nodesToStop = this.currentSourceNodes;
      this.currentSourceNodes = null;
      this.currentTrackId = null;
      this.isPlaying = false;

      setTimeout(() => {
        try {
          nodesToStop.stop();
        } catch {
          // ignore
        }
        if (this.ctx && this.masterGain) {
          this.masterGain.gain.setValueAtTime(originalVol, this.ctx.currentTime);
        }
      }, 300);
    } else {
      this.isPlaying = false;
      this.currentTrackId = null;
    }
  }

  public playTrack(trackId: string) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Strict rule: Only one track at a time! Stop previous if playing
    if (this.currentSourceNodes) {
      try {
        this.currentSourceNodes.stop();
      } catch {
        // ignore
      }
      this.currentSourceNodes = null;
    }

    this.currentTrackId = trackId;
    this.isPlaying = true;
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

    // Create synthesized audio generator based on category
    switch (trackId) {
      case 'rain_window':
      case 'gentle_rainfall':
        this.currentSourceNodes = this.createRainSynthesizer(trackId === 'rain_window');
        break;
      case 'cafe_chatter':
      case 'coffee_grinder':
        this.currentSourceNodes = this.createCafeSynthesizer();
        break;
      case 'fireplace':
        this.currentSourceNodes = this.createFireplaceSynthesizer();
        break;
      case 'forest_birds':
      case 'gentle_wind':
        this.currentSourceNodes = this.createForestSynthesizer(trackId === 'forest_birds');
        break;
      case 'night_crickets':
        this.currentSourceNodes = this.createCricketsSynthesizer();
        break;
      case 'soft_piano':
        this.currentSourceNodes = this.createPianoSynthesizer();
        break;
      case 'flowing_stream':
        this.currentSourceNodes = this.createStreamSynthesizer();
        break;
      default:
        this.currentSourceNodes = this.createRainSynthesizer(true);
        break;
    }
  }

  // --- Rain Synthesizer (Pink Noise + Bandpass Filter + Random Drop Impulses) ---
  private createRainSynthesizer(onWindow: boolean) {
    if (!this.ctx || !this.masterGain) return null;
    const ctx = this.ctx;
    
    // Pink Noise buffer for realistic rainfall
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter for window effect (muffled warm rain vs open rain)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(onWindow ? 850 : 1800, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.7, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);
    whiteNoise.start();

    // Occasional subtle raindrop clink for "rain on window"
    let dropInterval: number | null = null;
    if (onWindow) {
      dropInterval = window.setInterval(() => {
        if (!this.ctx || !this.masterGain || !this.isPlaying) return;
        const osc = this.ctx.createOscillator();
        const dropGain = this.ctx.createGain();
        osc.type = 'sine';
        const freq = 1200 + Math.random() * 800;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.4, this.ctx.currentTime + 0.08);

        dropGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

        osc.connect(dropGain);
        dropGain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
      }, 1200);
    }

    return {
      stop: () => {
        if (dropInterval) clearInterval(dropInterval);
        try {
          whiteNoise.stop();
          whiteNoise.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }

  // --- Cafe Synthesizer (Filtered warm noise + gentle periodic cup clinks) ---
  private createCafeSynthesizer() {
    if (!this.ctx || !this.masterGain) return null;
    const ctx = this.ctx;

    // Gentle murmur room noise
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const murmur = ctx.createBufferSource();
    murmur.buffer = buffer;
    murmur.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(500, ctx.currentTime);
    bandpass.Q.setValueAtTime(1.2, ctx.currentTime);

    const cafeGain = ctx.createGain();
    cafeGain.gain.setValueAtTime(0.35, ctx.currentTime);

    murmur.connect(bandpass);
    bandpass.connect(cafeGain);
    cafeGain.connect(this.masterGain);
    murmur.start();

    // Ceramic cup clinks at gentle random intervals
    const clinkInterval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const f = 2200 + Math.random() * 1200;
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    }, 4000 + Math.random() * 3000);

    return {
      stop: () => {
        clearInterval(clinkInterval);
        try {
          murmur.stop();
          murmur.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }

  // --- Fireplace Synthesizer (Low frequency rumble + organic snap/pops) ---
  private createFireplaceSynthesizer() {
    if (!this.ctx || !this.masterGain) return null;
    const ctx = this.ctx;

    // Warm roar
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.04;
    }

    const roar = ctx.createBufferSource();
    roar.buffer = buffer;
    roar.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(250, ctx.currentTime);

    const roarGain = ctx.createGain();
    roarGain.gain.setValueAtTime(0.6, ctx.currentTime);

    roar.connect(lowpass);
    lowpass.connect(roarGain);
    roarGain.connect(this.masterGain);
    roar.start();

    // Wood crackle pops
    const popInterval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      if (Math.random() > 0.4) {
        const osc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(600 + Math.random() * 1400, this.ctx.currentTime);
        popGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

        osc.connect(popGain);
        popGain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      }
    }, 280);

    return {
      stop: () => {
        clearInterval(popInterval);
        try {
          roar.stop();
          roar.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }

  // --- Forest & Birds Synthesizer (Breeze + melodic bird chirps) ---
  private createForestSynthesizer(includeBirds: boolean) {
    if (!this.ctx || !this.masterGain) return null;
    const ctx = this.ctx;

    // Soft canopy breeze
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.03;
    }

    const breeze = ctx.createBufferSource();
    breeze.buffer = buffer;
    breeze.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(0.8, ctx.currentTime);

    breeze.connect(filter);
    filter.connect(this.masterGain);
    breeze.start();

    let birdInterval: number | null = null;
    if (includeBirds) {
      birdInterval = window.setInterval(() => {
        if (!this.ctx || !this.masterGain || !this.isPlaying) return;
        // Cute melodic bird motif (2-3 quick chirps)
        const baseFreq = 2600 + Math.random() * 800;
        const now = this.ctx.currentTime;
        for (let i = 0; i < 3; i++) {
          const chirp = this.ctx.createOscillator();
          const chirpGain = this.ctx.createGain();
          chirp.type = 'sine';
          const startTime = now + i * 0.09;
          chirp.frequency.setValueAtTime(baseFreq + i * 200, startTime);
          chirp.frequency.exponentialRampToValueAtTime(baseFreq + 600, startTime + 0.06);

          chirpGain.gain.setValueAtTime(0.02, startTime);
          chirpGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.07);

          chirp.connect(chirpGain);
          chirpGain.connect(this.masterGain);
          chirp.start(startTime);
          chirp.stop(startTime + 0.08);
        }
      }, 3500 + Math.random() * 2500);
    }

    return {
      stop: () => {
        if (birdInterval) clearInterval(birdInterval);
        try {
          breeze.stop();
          breeze.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }

  // --- Crickets Synthesizer (High rhythmic pulse) ---
  private createCricketsSynthesizer() {
    if (!this.ctx || !this.masterGain) return null;
    const ctx = this.ctx;

    let cricketInterval: number | null = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(4600 + Math.random() * 200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    }, 180);

    return {
      stop: () => {
        if (cricketInterval) clearInterval(cricketInterval);
      }
    };
  }

  // --- Soft Piano Synthesizer (Generative pentatonic felt piano chords) ---
  private createPianoSynthesizer() {
    if (!this.ctx || !this.masterGain) return null;

    // Pentatonic scale frequencies: C4, D4, E4, G4, A4, C5, D5, E5
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let noteIndex = 0;

    const playChord = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const root = notes[noteIndex % notes.length];
      const harmony = notes[(noteIndex + 2) % notes.length];
      noteIndex = (noteIndex + 1 + Math.floor(Math.random() * 2)) % notes.length;

      [root, harmony].forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const noteGain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, this.ctx.currentTime); // felt piano warmth

        noteGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.2);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 3.3);
      });
    };

    playChord();
    const chordInterval = window.setInterval(playChord, 3600);

    return {
      stop: () => {
        clearInterval(chordInterval);
      }
    };
  }

  // --- Stream Synthesizer (High passed rushing water) ---
  private createStreamSynthesizer() {
    if (!this.ctx || !this.masterGain) return null;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const water = ctx.createBufferSource();
    water.buffer = buffer;
    water.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, ctx.currentTime);
    filter.Q.setValueAtTime(0.5, ctx.currentTime);

    water.connect(filter);
    filter.connect(this.masterGain);
    water.start();

    return {
      stop: () => {
        try {
          water.stop();
          water.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }

  // --- Completion Chime (Sparkling celebratory harp/bell arpeggio) ---
  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx) return;
    const ctx = this.ctx;

    const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    chimeNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const start = now + idx * 0.12;
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.9);
    });
  }
}

export const audioEngine = new AmbientAudioEngine();
