import IAnswer from "./IAnswer";

interface IQuestion {
  _id: any;
  no: number;
  timestamp: number;
  text: string;
  answers: Array<IAnswer>;
  totalVotes: number;
  options: {
    multipleChoice: boolean;
  };
}

export default IQuestion;
