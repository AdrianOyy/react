import { T3, UPDATE } from "./variable/stepName"

export default function getStepName(name) {
  switch (name) {
    case T3:
      return T3
    default:
      return UPDATE
  }
}
