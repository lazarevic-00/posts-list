import React from 'react';
import './App.scss';
import {QueryClient, QueryClientProvider} from 'react-query';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './shared/components/Footer';
import Header from './shared/components/Header';
import {PostPaginationProvider} from './utils/context/PostPaginationContext';
import {routes} from './utils/routes/routes';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PostPaginationProvider>
                <Router>
                    <div className="d-flex flex-column min-vh-100">
                        <Header/>
                        <div className="flex-grow-1">
                            <Routes>
                                {routes.map(({path, id, element}) => {
                                    return (
                                        <Route key={id} path={path} element={element}/>
                                    )
                                })}
                            </Routes>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </PostPaginationProvider>
        </QueryClientProvider>
    );
};

export default App;
