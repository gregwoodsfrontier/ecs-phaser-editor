
// You can write more code here
import { addComponent, addEntity, IWorld } from "bitecs";
import { Velocity } from "../ecs-comps/Velocity";
import { Position } from "../ecs-comps/Position";
import { Rotation } from "../ecs-comps/Rotation";
import { MatterSprite } from "../ecs-comps/MatterSprite";
import { Input } from "../ecs-comps/Input";
import { Player } from "../ecs-comps/Player";
import { Textures } from "../types/texture";
import { Scale } from "../ecs-comps/Scale";

/* START OF COMPILED CODE */
import Phaser from "phaser";
/* START-USER-IMPORTS */

/* END-USER-IMPORTS */

export default class TankBlue extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0, 'tank_blue')
		/* START-USER-CTR-CODE */
		// Write your code here.
		// this.setVisible(false)
		// this.setActive(false)

		this.once('ecs-world', (w: IWorld) => {
			this.world = w;
			this.setActive(false)
			this.setVisible(false)
			this.constructEnity(this.x, this.y)
		}, this)

		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this)
		// this.start(x, y)
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private world?: IWorld
	// Write your code here.
	start()
	{
		
	}

	constructEnity(x: number = 0, y: number = 0)
	{
		if(!this.world)
		{
			return
		}

		const tank = addEntity(this.world)

		console.log(`tank: ${tank}`)

		const compList = [
			Velocity,
			Position,
			Rotation,
			MatterSprite,
			Scale,
			Input,
			Player
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

		Scale.x[tank] = 1.2
		Scale.y[tank] = 1.2

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
