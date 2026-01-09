import { Bot } from "mineflayer";
import memory from "./Memory";
import { ChunkCoordsAndColumn, Chunk } from "prismarine-world/types/world"
import { SubChunk } from "prismarine-chunk/types"

declare module 'mineflayer' {
    interface GameState {
        height: number
    }
}

export function blocks(bot: Bot) {
    memory(bot);
    
    bot.findBlocks = (options FindBlockOptions) => {
            //1. find closest section with block
            //2. find closest block within section
            const columns: ChunkCoordsAndColumn[] = bot.world.getColumn();
            const closestSection: [number, SubChunk | null] = [Infinity, null];
            for (const column of columns) {
                for (let i = 0; i < bot.game.height >> 4; i++) {
                    const section = column.column.getSectionAtIndex(i);
                    for (const entry of section.getPalette()) {
                        if (entry.name === blockName) {
                            if 
                        }
                    }
                }
            }
        },

        load: () => {
            return blocks
        }
    };
    bot.findBlocks = (options) => {
        const matcher = getMatchingFunction(options.matching)
        const point = (options.point || bot.entity.position).floored()
        const maxDistance = options.maxDistance || 16
        const count = options.count || 1
        const useExtraInfo = options.useExtraInfo || false
        const fullMatcher = getFullMatchingFunction(matcher, useExtraInfo)
        const start = new Vec3(Math.floor(point.x / 16), Math.floor(point.y / 16), Math.floor(point.z / 16))
        const it = new OctahedronIterator(start, Math.ceil((maxDistance + 8) / 16))
        // the octahedron iterator can sometime go through the same section again
        // we use a set to keep track of visited sections
        const visitedSections = new Set()
    
        let blocks = []
        let startedLayer = 0
        let next = start
        while (next) {
          const column = bot.world.getColumn(next.x, next.z)
          const sectionY = next.y + Math.abs(bot.game.minY >> 4)
          const totalSections = bot.game.height >> 4
          if (sectionY >= 0 && sectionY < totalSections && column && !visitedSections.has(next.toString())) {
            const section = column.sections[sectionY]
            if (useExtraInfo === true || isBlockInSection(section, matcher)) {
              const begin = new Vec3(next.x * 16, sectionY * 16 + bot.game.minY, next.z * 16)
              const cursor = begin.clone()
              const end = cursor.offset(16, 16, 16)
              for (cursor.x = begin.x; cursor.x < end.x; cursor.x++) {
                for (cursor.y = begin.y; cursor.y < end.y; cursor.y++) {
                  for (cursor.z = begin.z; cursor.z < end.z; cursor.z++) {
                    if (fullMatcher(cursor) && cursor.distanceTo(point) <= maxDistance) blocks.push(cursor.clone())
                  }
                }
              }
            }
            visitedSections.add(next.toString())
          }
          // If we started a layer, we have to finish it otherwise we might miss closer blocks
          if (startedLayer !== it.apothem && blocks.length >= count) {
            break
          }
          startedLayer = it.apothem
          next = it.next()
        }
        blocks.sort((a, b) => {
          return a.distanceTo(point) - b.distanceTo(point)
        })
        // We found more blocks than needed, shorten the array to not confuse people
        if (blocks.length > count) {
          blocks = blocks.slice(0, count)
        }
        return blocks
    }
}

export default blocks;