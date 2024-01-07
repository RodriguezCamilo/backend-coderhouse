import React from 'react'
import { Button } from "@nextui-org/react";
import { useState } from 'react';

export default function Carrousel({ imgs }) {

    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? imgs.length - 1 : curr - 1))
    const next = () => setCurr((curr) => (curr === imgs.length - 1 ? 0 : curr + 1))

    return (
        <div className='w-full h-full relative'>
            <div style={{backgroundImage: `url(${imgs[curr]})`}} className='h-full w-full bg-center bg-contain duration-200 bg-no-repeat'></div>
            <div className='absolute inset-0 flex items-center justify-between p-4'>
                <Button onClick={prev} isIconOnly className='opacity-70 bg-white'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg></Button>
                <Button onClick={next} isIconOnly className='opacity-70 bg-white'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg></Button>
            </div>
            <div className='absolute bottom-4 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {imgs?.map((_, i) => (
                        <div className={`transition-all w-3 h-3 bg-black rounded-full ${curr == i ? "p-2" : "bg-opacity-50"}`}/>
                    ))}
                </div>
            </div>
        </div>
            )
}