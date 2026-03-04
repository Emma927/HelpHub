import { createContext } from 'react';
/**
 * UserContext definition.
 *
 * Architecture note: Separating Context from Provider and Hooks prevents
 * Circular Dependencies and ensures full compatibility with Vite's Fast Refresh.
 * This structure follows the Single Responsibility Principle (SRP).
 */
export const UserContext = createContext();
