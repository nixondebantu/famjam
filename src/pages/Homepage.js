import React from 'react';
import ImgCard from '../components/ImgCard';

export default function Homepage() {
  return (
    <>
        <hr className='h-px my-1 bg-gray-200 border-0 dark:bg-gray-700'/>
        <img class="h-2/3 w-full my-4" src="https://thumbs.dreamstime.com/b/happy-family-mother-father-children-son-daughter-sunset-nature-150794881.jpg" alt="happy family"/>
        <hr className='h-px my-4 bg-gray-200 border-0 dark:bg-gray-700'/>
        <h4 class="flex justify-center items-center mb-2 text-4xl font-bold tracking-tight text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">Our games</h4>
        <hr className='h-px my-4 bg-gray-200 border-0 dark:bg-gray-700'/>
        <div className="grid grid-cols-3 gap-4 px-3 py-4">
          <ImgCard title='Just Ask' details='Truth and dare for family and friends' imgURL='https://th.bing.com/th/id/OIG.83k86zc5XCZI6RBfTg4u?w=1024&h=1024&rs=1&pid=ImgDetMain' route='/justask'/>
          <ImgCard title='Sing It Out' details='Gaaner Koli' imgURL='https://th.bing.com/th/id/OIG.WIaCeXsJhcsYGAqal.ZW?pid=ImgGn' route='/singitout'/>
          <ImgCard title='Memory Lane' details='Memory sharing' imgURL='https://th.bing.com/th/id/OIG.IdVyQIMhb.T.i8v9gRH5?w=1024&h=1024&rs=1&pid=ImgDetMain' route='/memorylane'/>
          <ImgCard title='Majority' details='Poll for any decision' imgURL='https://th.bing.com/th/id/OIG.PYHtJ1iHq.._0jZfhpu4?pid=ImgGn' route='/majority'/>
          <ImgCard title='Guess Me' details='Among Us Lite' imgURL='https://th.bing.com/th/id/OIG.0XxxXfmeHak3C2yRhrh4?w=1024&h=1024&rs=1&pid=ImgDetMain' route='/guessme'/>
        </div>
    </>
  );
}
