import { FC } from "react";

interface Props {
  snippet: String;
  keywords: never[];
  onBack: any;
  prompt: String;
}

const Results: FC<Props> = ({ snippet, keywords, onBack, prompt }) => {
  //   const keywordsElements = [];
  //   for (let i = 0; i < keywords.length; i++) {
  //     const element = <div key={i}>{keywords[i]}</div>;
  //     keywordsElements.push(element);
  //   }

  return (
    <>
      <div>
        <div>
          <b>Prompt</b>
          <div>{prompt}</div>
          <div>
            <div>
              <b>Snippet:</b>
            </div>
            <div>{snippet}</div>
          </div>
          <div>
            <div>
              <b>keyWords:</b>
            </div>
            <div>
              {keywords.map((keyword, i) => (
                <div key={i}>{keyword}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={onBack}>Back</button>
    </>
  );
};

export default Results;
