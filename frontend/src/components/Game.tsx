import { useEffect, useRef } from "react";
import Phaser from "phaser";

const GAME_WIDTH = 900;
const GAME_HEIGHT = 500;
const MAX_DRAG = 120;
const DRAG_THRESHOLD = 8;
const LAUNCH_SCALE = 9;

class MainScene extends Phaser.Scene {
  private ball: Phaser.GameObjects.Arc | null = null;
  private ballBody: Phaser.Physics.Arcade.Body | null = null;
  private hoop: Phaser.GameObjects.Image | null = null;

  private isDragging = false;
  private isLaunched = false;
  private ballOrigin = new Phaser.Math.Vector2();
  private dragStart = new Phaser.Math.Vector2();
  private dragCurrent = new Phaser.Math.Vector2();

  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("hoop", "/hoop.png");
  }

  create() {
    // boundary
    const bounds = this.add.graphics();
    bounds.lineStyle(1, 0x404040, 1);
    bounds.strokeRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    this.input.on("pointerdown", this.handlePointerDown, this);
    this.input.on("pointermove", this.handlePointerMove, this);
    this.input.on("pointerup", this.handlePointerUp, this);
  }

  private spawnBallAndHoop(x: number, y: number) {
    this.ball = this.add.circle(x, y, 18, 0xe07020);
    this.physics.add.existing(this.ball);
    this.ballBody = this.ball.body as Phaser.Physics.Arcade.Body;
    this.ballBody.setCollideWorldBounds(false);
    this.ballBody.allowGravity = false;
    this.ballOrigin.set(x, y);

    const hoopY = Phaser.Math.Between(100, GAME_HEIGHT - 120);
    this.hoop = this.add.image(GAME_WIDTH - 120, hoopY, "hoop");
    this.hoop.setDisplaySize(100, 100);
  }

  private clearAll() {
    this.ball?.destroy();
    this.hoop?.destroy();
    this.ball = null;
    this.ballBody = null;
    this.hoop = null;
    this.isDragging = false;
    this.isLaunched = false;
  }

  private handlePointerDown(pointer: Phaser.Input.Pointer) {
    if (this.ball || this.isLaunched) return;
    this.spawnBallAndHoop(pointer.x, pointer.y);
    this.isDragging = false;
    this.dragStart.set(pointer.x, pointer.y);
    this.dragCurrent.set(pointer.x, pointer.y);
  }

  private handlePointerMove(pointer: Phaser.Input.Pointer) {
    if (!this.ball || this.isLaunched) return;
    if (!pointer.isDown) return;

    this.dragCurrent.set(pointer.x, pointer.y);
    const dist = Phaser.Math.Distance.Between(
      this.dragStart.x, this.dragStart.y,
      this.dragCurrent.x, this.dragCurrent.y
    );
    if (dist > DRAG_THRESHOLD) {
      this.isDragging = true;
    }
  }

  private handlePointerUp() {
    if (!this.ball) return;

    if (!this.isDragging) {
      this.clearAll();
      return;
    }

    const dx = this.ballOrigin.x - this.dragCurrent.x;
    const dy = this.ballOrigin.y - this.dragCurrent.y;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const clampedDist = Math.min(dist, MAX_DRAG);
    const nx = dist > 0 ? (dx / dist) * clampedDist : dx;
    const ny = dist > 0 ? (dy / dist) * clampedDist : dy;

    this.ballBody!.allowGravity = true;
    this.ballBody!.setVelocity(nx * LAUNCH_SCALE, ny * LAUNCH_SCALE);
    this.isLaunched = true;
    this.isDragging = false;
  }

  update() {
    // cleanup
    if (this.ball && this.isLaunched) {
      const { x, y } = this.ball;
      if (x < -50 || x > GAME_WIDTH + 50 || y < -50 || y > GAME_HEIGHT + 50) {
        this.clearAll();
      }
    }
  }
}

export default function Game() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      backgroundColor: "#0a0a0a",
      parent: containerRef.current,
      scene: MainScene,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 600 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        antialias: true,
      },
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <section id="game" className="min-h-screen w-full flex flex-col items-center justify-center px-40 py-24">
      <div
        ref={containerRef}
        className="w-full max-w-[900px] aspect-9/5 rounded-sm overflow-hidden"
      />
    </section>
  );
}
