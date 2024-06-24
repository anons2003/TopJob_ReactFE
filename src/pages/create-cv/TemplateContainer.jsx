import React from 'react';
import useTemplate from '../../hook/useTemplate';
import { AnimatePresence } from 'framer-motion';
import TemplateDesignPin from '../../components/template-design/TemplateDesignPin';
import NavbarDark from '../../components/navbarDark';
import Footer from '../../components/footer';
import ScrollTop from '../../components/scrollTop';

const TemplateContainer = () => {
    const { data: templates, isError: temp_isError } = useTemplate();

    const RenderAnTemplate = ({ templates }) => {
        return (
            <>
                <NavbarDark />
                {templates && templates.length > 0 ? (
                    <AnimatePresence>
                        {templates.map((template, index) => (
                            <TemplateDesignPin
                                key={template?._id}
                                data={template}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                ) : (
                    <p className='text-lg text-txtDark'>No template found</p>
                )}
                <Footer top={true} />
                <ScrollTop />
            </>
        );
    };

    return (
        <div>
            home-template
            {temp_isError ? (
                <p className='text-lg text-txtDark'>Something went wrong... Please try again later</p>
            ) : (
                <div className='w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2'>
                    <RenderAnTemplate templates={templates} />
                </div>
            )}
        </div>
    );
};

export default TemplateContainer;
