// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { createWorld, IWorld, pipe } from "bitecs";
import Player from "../prefabs/Player";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.world = createWorld()
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(400, 436, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Phaser 3 + Phaser Editor 2D\nVite + TypeScript";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// tank_green
		this.add.image(363, 229, "tank_green");

		// tank_red
		this.add.image(494, 258, "tank_red");

		// treeLarge
		this.add.image(483, 89, "treeLarge");

		// treeSmall
		this.add.image(629, 84, "treeSmall");

		// player
		const player = new Player(this, 131, 98);
		this.add.existing(player);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()

		const onAfterUpdate = () => {
			if (!this.afterPhysicsPipeline || !this.world)
			{
				return
			}

			this.afterPhysicsPipeline(this.world)
		}

		this.matter.world.on(Phaser.Physics.Matter.Events.AFTER_UPDATE, onAfterUpdate)

		this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			this.matter.world.off(Phaser.Physics.Matter.Events.AFTER_UPDATE, onAfterUpdate)
		})
	}

	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	private world?: IWorld
	private pipeline?: (world: IWorld) => void
	private afterPhysicsPipeline?: (world: IWorld) => void

	// Write your code here
	create() {

		this.editorCreate();

		// create MatterSpriteSystem
		this.pipeline = pipe(
			createMatterSpriteSystem(this.matter, TextureKeys),
			createMatterStaticSpriteSystem(),
			createPlayerSystem(this.cursors),
			createSteeringSystem(5),
			createMatterPhysicsSystem()
		)

		this.afterPhysicsPipeline = pipe(
			createMatterPhysicsSyncSystem()
		)

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here