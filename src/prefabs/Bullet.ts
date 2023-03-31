
// You can write more code here
import { addComponent, addEntity, IWorld } from "bitecs";

/* START OF COMPILED CODE */

import Phaser from "phaser";

export default class Bullet extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 0.5446695508423897;
		this.scaleY = 0.4920934308794387;

		// guapen_1
		const guapen_1 = scene.add.image(0, 0, "guapen");
		this.add(guapen_1);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.once('ecs-world', (w: IWorld) => {
			this.world = w;
			this.setActive(false)
			this.setVisible(false)
			this.constructEnity(this.x, this.y)
		}, this)
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	private world?: IWorld
	
	constructEnity(x: number = 0, y: number = 0)
	{
		if(!this.world)
		{
			return
		}

		const bullet = addEntity(this.world)

		console.log(`tank: ${bullet}`)

		const compList = [
			Velocity,
			Position,
			MatterSprite,
			Bullet
		]

		compList.forEach(comp => {
			if(!this.world)
			{
				return
			}
			addComponent(this.world, comp, tank)
		})

		MatterSprite.texture[tank] = Textures.TankBlue
		Position.x[tank] = x
		Position.y[tank] = y

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
