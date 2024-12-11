import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { routeObjects } from './App.data';

function App() {
  const routes = useRoutes(routeObjects);

  return <Suspense fallback={<div>loading ...</div>}>{routes}</Suspense>;
}

export default App;
