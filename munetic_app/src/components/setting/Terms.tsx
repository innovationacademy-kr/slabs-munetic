import styled from 'styled-components';
import { useState, useEffect } from 'react';
import * as EtcAPI from '../../lib/api/etc';

const InnerWrapper = styled.div`
  font-family: "Roboto","Arial",sans-serif;
  font-size: 0.9rem;
  white-space : pre-line;
`;

export default function Terms() {
  const [text, setText] = useState<string>("");

  const getTerms = () => {
    EtcAPI.getTerms()
      .then(({ data }: any) => {
        setText(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTerms();
  }, []);

    return (
      <InnerWrapper>{text}</InnerWrapper>
    );
}
