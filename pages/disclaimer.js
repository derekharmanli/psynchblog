import React from 'react';
import { Layout} from '../components';
const Disclaimer = () => {
  return (
    <Layout>
    <div className="container mx-auto px-10 mb-8">
      <h1 className="text-white text-3xl mb-4 border-b">Disclaimer</h1>
      <div className="text-white text-xl">
        This is NOT medical advice. Any decision you make clinically using this information is at your own risk. If you have any questions, please email derek.harmanli@gmail.com.
      </div>
    </div>
    </Layout>
  );
};

export default Disclaimer;