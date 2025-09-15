export interface ISlide {
  id: number;
  title: string;
  subtitle: string;
}

export interface IDate {
  theme: string;
  slides: ISlide[];
  periodStart: number;
  periodEnd: number;
}
