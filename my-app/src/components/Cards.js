import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import cake0 from '../images/banner0.jpeg';
import cake1 from '../images/banner1.jpeg';
import cake2 from '../images/banner2.png';
import cake3 from '../images/banner3.png';
import { Link } from 'react-router-dom';

function Cards() {
  return (
    <div className='cards'>
      <h1>課程作品</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={cake0}
              text='多種花型從初學到大師級系統化學習'
              label='六寸蛋糕'
              path='/homecourse'
            />
            <CardItem
              src={cake1}
              text='單日班、多日全修班專業學習'
              label='杯子蛋糕'
              path='/homecourse'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={cake2}
              text='仿真如鮮花般的材質，手作首選'
              label='十寸蛋糕'
              path='/courseintro'
            />
            <CardItem
              src={cake3}
              text='0 基礎開始指導，結合多樣可食用素材'
              label='八寸蛋糕'
              path='/courseintro'
            />
            <CardItem
              src={cake0}
              text='做出各種造型變化，不藏私，指導擠花不失敗的秘訣'
              label='六寸蛋糕'
              path='/courseintro'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;