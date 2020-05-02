import IAnswer from "./IAnswer";

interface IQuestion {
  _id: any;
  no: number;
  timestamp: number;
  text: string;
  answers: Array<IAnswer>;
  options: {
    multipleChoice: boolean;
  };
}

export default IQuestion;
