/// <reference types="./worker-configuration" />
import type { DrizzleClient } from "$lib/server/db";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
        interface Platform {
            env: Env
            cf: CfProperties
            ctx: ExecutionContext
        }
        interface Locals {
            db: DrizzleClient
        }
    }
}

export {};