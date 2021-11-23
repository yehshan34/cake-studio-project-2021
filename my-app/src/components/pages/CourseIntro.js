import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import './CourseIntro.css';
import wagashi0 from '../../images/wagashi0.png';
import cakecourse0 from '../../images/full-cake-course.png';
import paperflower from '../../images/paperflower.png';
import russia from '../../images/russia.png';
import Navbar from './../Navbar';


export default function CourseIntro() {
  return (
    <>
    <Navbar />
    <h1 className='courseintro'>課程介紹</h1>
    <div className="course_container">
    <div className="course_category">
    <h1 className="fourcourses_heading">課程四大分類</h1>
    <p className="p_courseintro">可以點選想要了解的類型</p>
    <h3><a href='#wagashi'>1. 減糖和菓子系列</a></h3>
    <p className="p_courseintro">多種菓子從初學到大師系統化學習</p>
    <h3><a href="#cake_course">2. 韓式裱花蛋糕系列</a></h3>
    <p className="p_courseintro">單日班、多日全修班專業學習</p>
    <h3><a href="#paperflower_course">3. 威化紙花 / 冷瓷土花系列</a></h3>
    <p className="p_courseintro">仿真如鮮花般的材質，手作首選</p>
    <h3><a href="#russia_course">4. 俄羅斯刮刀花系列</a></h3>
    <p className="p_courseintro"> 0 基礎開始指導，結合多樣可食用素材，一次全網羅學習</p>
    </div>
    <div className="course_individual">
    <div className="wagashi" id="wagashi">
    <h2 className="course-name">減糖和菓子系列</h2>
    <img className="course-image" src={wagashi0} alt="wagashi"></img>
    <span className="course-desc">☑️ 省時省力：有別於一般菓子費時煉製，直接使用家裡輕易取得的用具製作，讓同學輕鬆短時間內快速完成皮餡。
    
    ☑️ 減糖又美味：使用高品質的”低糖無油”白豆沙，教授獨家配方，配上一口茶，韻味細緻又健康！
    
    ☑️ 藝術：捨棄傳統木工較難取得的訂製工具與高門檻的捏製手勢，Sunny's Studio 提供容易取得的工具塑形，用對了方法，一樣做出絕美造型。</span>
    
    </div>
    <div className="cake_course" id="cake_course">
    <h2 className="course-name">韓式擠花系列</h2>
    <img className="course-image" src={cakecourse0} alt="cake_course"></img>
    <span className="course-desc">
    ☑️ 教授多種進階自然花型，以及擬真花朵的蛋糕組裝技巧、進階配色工具的應用及理論實作，讓配色功力提升
    
    ☑️ 小班制教學，品質不打折！課程可錄影、可拍照，回家複習更方便
    
    ☑️ 課程加入最新流行的糯米紙花/威化紙裝飾技巧，雙重學習！讓蛋糕立體裝飾與美感提升！
    
    ☑️ 教授實用蛋糕抹面技巧與不同花型配花方式（包含杯子蛋糕、花圈、捧花、月牙造型等等），多變造型應用，技能提升
    
    ☑️ 使用更多小花嘴與進階版花嘴，搭配擬真葉子技巧讓蛋糕上的花朵更加精緻化
    
    ☑️ 將花朵的紋路和質地使用不同工具改造成真花的效果（例如製造花朵的邊線暈染、花蕊立體效果、花瓣更薄透方法…等），魔鬼藏在細節裡！
    </span>
    </div>
    
    <div className="paperflower_course" id="paperflower_course">
    <h2 className="course-name">威化紙花/冷瓷土花系列</h2>
    <img  className="course-image" src={paperflower} alt="paperflower_course"></img>
    <span className="course-desc">
    ☑️ 擬真花瓣製作與刷色技巧
    
    ☑️ 花型不死板的皺摺變化
    
    ☑️ 提供耗材等原物料購買出處管道
    
    ☑️ 指導可食用與保存的方法
    
    ☑️ 無需經驗、0 基礎也能上手
    </span>
    </div>
    
    <div className="russia_course" id="russia_course">
    <h2 className="course-name">俄羅斯刮刀花系列</h2>
    <img  className="course-image" src={russia} alt="russia_course"></img>
    <span className="course-desc">
    ☑️ 雙重技能學習！結合糯米紙花技巧，做出薄透而擬真可食用的花朵與葉子
    
    ☑️ 0 鐵絲技術！指導可食用擬真藤蔓、楓葉、樹枝、花莖、葉子
    
    ☑️ 教授刮刀花瓣不同角度的變化、薄透花瓣、花葉擺放方式，花瓣間自然躍動、不死板的搭配～成就自然風格的美感
    
    ☑️ 0 基礎也能在老師一步步帶領下上手，無需烘焙經驗
    
    ☑️ 學習到的裝飾技巧可應用於各種不同的蛋糕體，例如：瑪德蓮、慕斯、戚風、磅蛋糕、棉花糖、餅乾等各式各樣甜點裝飾上！非常廣泛好用
    
    ☑️ 刮刀花使用工具簡便好攜帶，信手拈來即興創作</span>
    </div>
    
    </div>
    </div>
    <Footer />
    </>
    );
  }