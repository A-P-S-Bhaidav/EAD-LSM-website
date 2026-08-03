// @ts-nocheck
'use client';
import { useEffect } from 'react';

const useCanvasCursor = () => {
  useEffect(() => {
    /* ── state ── */
    let ctx;
    let f;
    let e = 0;
    const pos = { x: 0, y: 0 };
    let lines = [];
    const E = {
      friction: 0.5,
      trails: 22,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

    /* ── Wave oscillator ── */
    function Wave(opts) {
      this.phase = opts.phase || 0;
      this.offset = opts.offset || 0;
      this.frequency = opts.frequency || 0.001;
      this.amplitude = opts.amplitude || 1;
    }
    Wave.prototype.update = function () {
      this.phase += this.frequency;
      e = this.offset + Math.sin(this.phase) * this.amplitude;
      return e;
    };
    Wave.prototype.value = function () {
      return e;
    };

    /* ── Node ── */
    function Node() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
    }

    /* ── Line (trail) ── */
    function Line(opts) {
      this.spring = opts.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (let i = 0; i < E.size; i++) {
        const n = new Node();
        n.x = pos.x;
        n.y = pos.y;
        this.nodes.push(n);
      }
    }
    Line.prototype.update = function () {
      let spring = this.spring;
      const head = this.nodes[0];
      head.vx += (pos.x - head.x) * spring;
      head.vy += (pos.y - head.y) * spring;
      for (let i = 0; i < this.nodes.length; i++) {
        const t = this.nodes[i];
        if (i > 0) {
          const prev = this.nodes[i - 1];
          t.vx += (prev.x - t.x) * spring;
          t.vy += (prev.y - t.y) * spring;
          t.vx += prev.vx * E.dampening;
          t.vy += prev.vy * E.dampening;
        }
        t.vx *= this.friction;
        t.vy *= this.friction;
        t.x += t.vx;
        t.y += t.vy;
        spring *= E.tension;
      }
    };
    Line.prototype.draw = function () {
      let x = this.nodes[0].x;
      let y = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(x, y);
      const last = this.nodes.length - 2;
      for (let i = 1; i < last; i++) {
        const a = this.nodes[i];
        const b = this.nodes[i + 1];
        x = 0.5 * (a.x + b.x);
        y = 0.5 * (a.y + b.y);
        ctx.quadraticCurveTo(a.x, a.y, x, y);
      }
      const a = this.nodes[last];
      const b = this.nodes[last + 1];
      ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
      ctx.stroke();
      ctx.closePath();
    };

    /* ── init lines ── */
    function initLines() {
      lines = [];
      for (let i = 0; i < E.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
      }
    }

    /* ── pointer handlers ── */
    function onPointerMove(ev) {
      if (ev.touches) {
        pos.x = ev.touches[0].pageX;
        pos.y = ev.touches[0].pageY;
      } else {
        pos.x = ev.clientX;
        pos.y = ev.clientY;
      }
      ev.preventDefault();
    }
    function onTouchStart(ev) {
      if (ev.touches.length === 1) {
        pos.x = ev.touches[0].pageX;
        pos.y = ev.touches[0].pageY;
      }
    }

    /* ── first-move bootstrap ── */
    function onFirstMove(ev) {
      document.removeEventListener('mousemove', onFirstMove);
      document.removeEventListener('touchstart', onFirstMove);
      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchstart', onTouchStart, { passive: true });
      onPointerMove(ev);
      initLines();
      render();
    }

    /* ── render loop ── */
    function render() {
      if (!ctx || !ctx.running) return;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `hsla(${Math.round(f.update())},80%,65%,0.18)`;
      ctx.lineWidth = 1.2;
      for (const line of lines) {
        line.update();
        line.draw();
      }
      window.requestAnimationFrame(render);
    }

    /* ── resize ── */
    function resizeCanvas() {
      if (!ctx) return;
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    /* ── boot ── */
    const canvas = document.getElementById('cursor-canvas');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    ctx.running = true;

    // Oscillate within the blue/cyan range: hue 190–240
    f = new Wave({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 25,      // swing ±25° around the centre
      frequency: 0.0018,
      offset: 215,        // centre = 215° (cornflower blue)
    });

    resizeCanvas();

    document.addEventListener('mousemove', onFirstMove);
    document.addEventListener('touchstart', onFirstMove, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', () => {
      if (!ctx.running) { ctx.running = true; render(); }
    });
    window.addEventListener('blur', () => { ctx.running = false; });

    /* ── cleanup ── */
    return () => {
      ctx.running = false;
      document.removeEventListener('mousemove', onFirstMove);
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('touchstart', onFirstMove);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
};

export default useCanvasCursor;
