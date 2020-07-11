import { Horario } from './horario'
export interface Agenda {
    id: number;
    dia: Date;
    horarios: Array<Horario>;
}