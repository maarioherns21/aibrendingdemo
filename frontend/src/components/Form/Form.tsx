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
    <div>
      <p>tell me what your bran is aboutt and i will genereate a copy</p>
      <input
        type="text"
        placeholder="Coffe"
        value={prompt}
        onChange={(e) => updatePromptValue(e.target.value)}
      ></input>
      <div>
        {prompt.length}/{characterLimit}
      </div>
      <button onClick={handleSubmit} disabled={isLoading || isPromptValid}>
        Submit
      </button>
      {resultsElement}
    </div>
  );
};

export default Form;
