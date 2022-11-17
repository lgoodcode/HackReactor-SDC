// Need to export something to make it a module
export declare global {
  // Globally declare the types to reduce repetition. Must import THEN export
  // for the types to be available globally.
  import type { Request, Response, NextFunction } from 'express'
  export { Request, Response, NextFunction }
}
