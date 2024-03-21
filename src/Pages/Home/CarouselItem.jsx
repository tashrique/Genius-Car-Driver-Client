import React from 'react';

const CarouselItem = (slide) => {

    const { img, prev, next, id } = slide;

    return (
        <div id={`slide${id}`} className="carousel-item relative max-h-screen w-full object-cover overflow-hidden rounded-xl">
            <div className="carousel-image">
                <img src={img} className="w-full" />
            </div>
            <div className="absolute flex flex-col justify-end gap-16 transform -translate-y-1/2 left-24 top-1/2">
                <h1 className="text-6xl font-bold text-white leading-12">Affordable <br /><span className="text-orange-500">Price</span> for Car <br />Servicing</h1>
                <p className='text-xl text-white w-3/5'>Get the fastest quality service from the best car mechanics in town.</p>
                <div className='flex gap-4 justify-start'>
                    <button className='btn btn-warning'>Get a Quote</button>
                    <button className='btn btn-ghost text-white border-white border-2'>Learn More</button>
                </div>
            </div>
            <div className="absolute flex justify-end gap-2 transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle bg-[#ffffff50] text-white hover:bg-[#ffffff30]">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle bg-orange-500 border-0 text-white hover:bg-orange-400">❯</a>
            </div>
        </div>
    );
};

export default CarouselItem;