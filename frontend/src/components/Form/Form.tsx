import { off } from "process";
import { FC } from "react";

interface Props {
  prompt: string;
  setPrompt: any;
  resultsElement: any;
  handleSubmit: any;
  characterLimit: number;
  isLoading: boolean;
}

const Form: FC<Props> = ({
  handleSubmit,
  setPrompt,
  resultsElement,
  prompt,
  characterLimit,
  isLoading,
}) => {
  //   const characterLimit = 32;
  const isPromptValid = prompt.length >= characterLimit;
  const updatePromptValue = (text: string) => {
    if (text.length <= characterLimit) {
      setPrompt(text);
    }
  };

  return (
    <div className="mb-6 text-slate-400">
      <p>tell me what your bran is aboutt and i will genereate a copy</p>
      <input
      className="p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"
        type="text"
        placeholder="Coffe"
        value={prompt}
        onChange={(e) => updatePromptValue(e.target.value)}
      ></input>
      <div>
        {prompt.length}/{characterLimit}
      </div>
      <button
      className="bg-gradient-to-r from-teal-400 
      to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg"
       onClick={handleSubmit} disabled={isLoading || isPromptValid}>
        Submit
      </button>
      {resultsElement}
    </div>
  );
};

export default Form;
