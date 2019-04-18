import React from 'react';

import { MainTemplate } from '../../../ui/templates/main-template';
import { Header } from '../../common/organisms/header';
import { Footer } from '../../common/organisms/footer';


export const GamePage = () =>
  <MainTemplate header={<Header />} footer={<Footer />}>
  </MainTemplate>
;