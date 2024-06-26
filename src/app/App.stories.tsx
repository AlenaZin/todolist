import { App } from "./App";
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
  title: 'AppWithRedux Component', 
  component: App,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
};

//const chengeTitleCallback = action('Title chenged')

export const EditableSpanBaseExampe = () => {
  return (
      <App demo={true}/>
  ); 
}

