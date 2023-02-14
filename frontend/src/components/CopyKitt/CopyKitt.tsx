"use client";
import { FC, useState } from "react";
import Form from "../Form/Form";
import Results from "../Results/Results";

const CopyKatt: FC = () => {
  const ENDPOINT: string = `https://sevtkec2pk.execute-api.us-west-1.amazonaws.com/prod/genererate_snippets_and_keyword`;
  const [prompt, setPrompt] = useState("");
  const [snippet, setSnippet] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const CHARACTER_LIMIT = 32;
  const [isLoading, setIsLoading] =useState(false)



  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await fetch(`${ENDPOINT}?prompt=${prompt}`);
    const data = await res.json();
    onResult(data);
  };

  const onResult = (data: any) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false)
  };

  const onReset = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false)
  };

  let displayElement = null;

  if (hasResult) {
    displayElement = (
      <Results
        onBack={onReset}
        snippet={snippet}
        keywords={keywords}
        prompt={prompt}
      />
    );
  } else {
    displayElement = (
      <Form
        handleSubmit={handleSubmit}
        setPrompt={setPrompt}
        resultsElement={displayElement}
        characterLimit={CHARACTER_LIMIT}
        prompt={prompt}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      <div>
        <h1>Coppy Katt</h1>
        {displayElement}
      </div>
    </>
  );
};

export default CopyKatt;
