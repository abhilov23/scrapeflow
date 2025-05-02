import { executionPhase } from "../generated/prisma";


type Phase = Pick<executionPhase, "creditsConsumed">;
export function getPhasesTotalCost(phases: Phase[]){
   return phases.reduce((acc, phase)=> acc + (phase.creditsConsumed || 0), 0);

}