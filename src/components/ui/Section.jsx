import React from 'react'
import Container from './container.jsx'

const Section = ({ id, title, subtitle, children }) => {
    return (

        <section id={id} className="py-12 md:py20">
            <Container>
                <div className="mb-8">
                    {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
                    {title && <h2 className="text-3xl md:text-4x1 font-extrabold">{title}</h2>}
                </div>
                {children}
            </Container>

        </section>

    )
}

export default Section
