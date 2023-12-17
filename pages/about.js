import React from "react";
import { Layout } from "../components";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-10 mb-8">
        <h1 className="text-white text-3xl mb-4 border-b">About Page</h1>
        <div className="text-white text-xl">
          This website was created to address an issue with audio/visual media.
          Many individuals do not have the time to look at these resources so
          this website creates transcriptions and summaries to make information
          more accessible. This information, which will always be free, is
          generated using different AI models. If you have any questions, please
          email derek.harmanli@gmail.com.
        </div>
      </div>
    </Layout>
  );
};

export default About;
