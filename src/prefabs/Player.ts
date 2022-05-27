
// You can write more code here

/* START OF COMPILED CODE */
import Phaser from "phaser";
/* START-USER-IMPORTS */
import { addComponent, addEntity, IWorld } from "bitecs";
import { Velocity } from "../ecs-comps/Velocity";
import { Position } from "../ecs-comps/Position";
import { Rotation } from "../ecs-comps/Rotation";
import { MatterSprite } from "../ecs-comps/MatterSprite";
import { Input } from "../ecs-comps/Input";
import { Player } from "../ecs-comps/Player";
import { TextureKeys, Textures } from "../types/texture";
/* END-USER-IMPORTS */

export default class TankBlue extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, world: IWorld, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0, 'tank_blue')
		/* START-USER-CTR-CODE */
		// Write your code here.
		this.setVisible(false)
		this.setActive(false)
		
		this.world = world
		this.start(x, y)
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private world?: IWorld
	// Write your code here.
	start(x: number = 0, y: number = 0)
	{
		if(!this.world)
		{
			return
		}

		const tank = addEntity(this.world)

		const compList = [
			Velocity,
			Position,
			Rotation,
			MatterSprite,
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

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
