import { FooterApp } from './FooterApp';
import { HeaderApp } from './HeaderApp';
import { RoutesWrapper } from './RoutesWrapper';

const LayoutApp= ()=> {
  return (
    <>
      <HeaderApp/>
      <main>
        <RoutesWrapper/>
      </main>
      <FooterApp/>
    </>
  );
}

export {LayoutApp};
