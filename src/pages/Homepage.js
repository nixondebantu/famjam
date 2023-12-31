import React from 'react';
import ImgCard from '../components/ImgCard';

export default function Homepage() {
  return (
    <>
        <img class="h-auto max-w-full" src="https://thumbs.dreamstime.com/b/happy-family-mother-father-children-son-daughter-sunset-nature-150794881.jpg" alt="happy family"/>
        <h1>Our games</h1>
        <ImgCard title='Just Ask' details='Truth and dare for family and friends' route='/justask'/>
        <ImgCard title='Sing It Out' details='Gaaner Koli' route='/singitout'/>
        <ImgCard title='Memory Lane' details='Memory sharing' route='/memorylane'/>
        <ImgCard title='Majority' details='Poll for any decision' route='/majority'/>
        <ImgCard title='Guess Me' details='Among Us Lite' route='/guessme'/>
    </>
  );
}
