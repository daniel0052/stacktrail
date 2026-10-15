import { createContext, useContext, type ReactNode } from 'react';
const Scope=createContext('');
export function LessonPracticeScope({lessonId,children}:{lessonId:string;children:ReactNode}){return <Scope.Provider value={lessonId}>{children}</Scope.Provider>;}
export function useLessonPracticeScope(){return useContext(Scope);}
