# Phaser Study

Phaser 개발을 위해 Phaser 공부 및 정리를 위한 공간

https://labs.phaser.io/

## 캐릭터

### spritesheet

frameWidth, frameHeight 설정 방법은

이미지보고 계산하는 방법도 있고

그냥 debug 키고 대충 맞춰보는 것도 방법인거 같음

## Debug

physics가 있어야 그때부터 debug 모드가 먹힘

## Physics

phaser에서 사용되는 물리 엔진을 설정하기 위한 속성

### arcade

가볍고 간단한 2D 스타일의 물리 엔진을 만들 때 사용

박스기반 물리엔진

### matter

복잡하고 강력한 2D 엔진을 만들 때 사용

세부적인 조작이 가능한 물리 엔진

path 간 처리 가능

### impact

impact.js 라이브러리에서 파생된 2D 물리 엔진으로, HTML5 기반 게임에 최적화

## Collision

### bounce

-   setBounce : 얼마나 팅길지 설정

### setCollideWorldBounds

게임 화면 밖으로 나가지 않게 설정

### collide, overlap

```js
const create = () => {
	// physics 처리를 해줘야함

	this.physics.add.existing(this.ball);
	this.physics.add.existing(this.ball2);
	this.physics.add.existing(this.ball3);
};

const update = () => {
	// update에서 collide or overlap 처리

	// collide
	this.physics.collide(this.ball, this.ball2);

	// overlap
	this.physics.overlap(this.ball, this.ball3, (ball, ball3) => {
		// parameter로 받아서 이벤트 처리 해줄 수 있음
		ball3.destroy();
	});
};
```
