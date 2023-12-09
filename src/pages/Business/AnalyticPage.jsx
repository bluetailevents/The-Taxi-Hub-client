import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSections, setMethod, setSection, setOption, setRandomize} from '../../features/sections/sectionSlice';
import Toolbar from '../../components/common/Toolbar';
import ContentWindow from '../../components/business/ContentWindow';
import Spinner from '../../components/common/Spinner';

function Test() {
    const dispatch = useDispatch();
    const sectionsData = useSelector(state => state.sections.sections);
    const loading = useSelector(state => state.sections.isLoading);
    const error = useSelector(state => state.sections.isError);
    const method = useSelector(state => state.sections.method);
    const section = useSelector(state => state.sections.section);
    const option = useSelector(state => state.sections.option);
    const randomize = useSelector(state => state.sections.randomize);
    const handleMethodSelect = (method, section, option) => {
        dispatch(setMethod(method));
        dispatch(setSection(section));
        dispatch(setOption(option));
    }

    const handleRandomizeChange = (newState) => {
        dispatch(setRandomize(newState));
    }

    useEffect(() => {
        dispatch(getSections());
    }, [dispatch]);

    if (loading) return <div><Spinner /></div>;
    if (error) return <div>Error occurred</div>;

    const sections = Object.values(sectionsData);

    return (
        <div className="test-container">
            <Toolbar 
                sections={sections} 
                onSelectMethod={handleMethodSelect} 
                onRandomizeChange={handleRandomizeChange} 
            />
            <ContentWindow 
                selectedMethod={method} 
                selectedSection={section} 
                selectedOption={option} 
                randomize={randomize}
            />
        </div>
    );
}

export default Test;
