
import List from './book/list'
import Edit from './book/edit'
import Preview from './book/preview'


import { Route, Switch} from 'react-router-dom'


function App() {
  return (
    <div className="App">
        <Switch>
            <Route path="/" exact component={List} />
            <Route path="/products" exact component={List} />
            <Route path="/products/new" exact component={Edit} />
            <Route path="/products/:no/edit" exact component={Edit} />
            <Route path="/products/:no" exact component={Preview} />
        </Switch>
    </div>
  );
}

export default App;
