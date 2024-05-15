import { React, useEffect, useState } from "react";
import './Details.css';
import product from './/example_products_photo/1.webp';
import axios from "axios";

export default function ProductDetail() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getProductDetails()
  }, [])
  function getProductDetails() {
    axios
      .get('/api/products/ccd9ead9-6e54-4de9-bd22-2852f9a4cc56/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }
  // getProductDetails()
  function checkAvailability(char) {
    if (char) return "Есть"
    else return "Нет"
  }

  return (
    <div className="container">
      <h1 className="header">{data.name}</h1>
      <div className="details">
        <div className="pictures">
          <img className="image" src={product} alt="product"></img>
        </div>
        <div className="text_right">
          <div className="full_name">{data.name}</div>
          <div className="top_buttons">
            <div className="compare">Сравнить</div>
            <div className="rating">Рейтинг</div>
            <div className="comments"><img className="icons_0" width="30" height="30" src="https://img.icons8.com/windows/32/chat.png" alt="Chat" /></div>
            <div className="reliability">Надёжность</div>
            <div className="share"><img className="icons_0" width="30" height="30" src="https://img.icons8.com/windows/32/share-2.png" alt="share" /></div>
          </div>
          <div className="mid_buttons">
            <div className="price">{Math.floor(data.price)} ₽</div>
            <div className="fav"><img className="icons_0" width="40" height="40" src="https://img.icons8.com/windows/64/like--v1.png" alt="Fav" /></div>
            <div className="buy"><strong>Купить</strong></div>
          </div>
        </div>
      </div>
      <div className="page_bottom">
        <div className="side_buttons">
          <div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/windows/32/settings--v1.png" alt="Characteristics" />Характеристики</div>
          <div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/windows/32/star--v1.png" alt="Rating" />Отзывы</div>
          <div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/windows/32/chat.png" alt="Chat" />Коммуникатор</div>
          <div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/external-reliability-customer-services-help-support-smashingstocks-mixed-smashing-stocks.png" alt="Reliability" />Надёжность</div>
          <div className="side_button"><img className="icons" width="30" height="30" src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/external-files-files-those-icons-lineal-those-icons.png" alt="Files" />Инструкции и файлы</div>
        </div>
        <div className="characteristics">
          <div className="chars_title">Характеристики {data.name}</div>
          <div className="chars_content">
            
            <div className="char_title">Клавиатура</div>
            <div className="char">
              <div className="char_name">Механическая клавиатура</div>
              <div className="char_value">{checkAvailability(data.mechanical_keyboard)}</div>
            </div>
            <div className="char">
              <div className="char_name">Влагозащищенная клавиатура</div>
              <div className="char_value">{checkAvailability(data.waterproof_keyboard)}</div>
            </div>
            <div className="char_title">Экран</div>
            <div className="char">
              <div className="char_name">Диагональ экрана, дюймы</div>
              <div className="char_value">{data.screen_diagonal}</div>
            </div>
            <div className="char">
              <div className="char_name">Сенсорный экран</div>
              <div className="char_value">{checkAvailability(data.touch_screen)}</div>
            </div>
            <div className="char_title">Процессор</div>
            <div className="char">
              <div className="char_name">Модель процессора</div>
              <div className="char_value">{data.processor_model}</div>
            </div>
            <div className="char">
              <div className="char_name">Количество ядер процессора</div>
              <div className="char_value">{data.total_number_cores}</div>
            </div>
            <div className="char">
              <div className="char_name">Частота процессора</div>
              <div className="char_value">{data.processor_frequency} ГГц</div>
            </div>
            <div className="char_title">Оперативная память</div>
            <div className="char">
              <div className="char_name">Тип оперативной памяти</div>
              <div className="char_value">{data.memory_type}</div>
            </div>
            <div className="char">
              <div className="char_name">Оперативная память</div>
              <div className="char_value">{data.amount_RAM} ГБ</div>
            </div>
            <div className="char">
              <div className="char_name">Возможность расширения оперативной памяти, до</div>
              <div className="char_value">{data.max_amount_RAM} ГБ</div>
            </div>
            <div className="char_title">Твердотельные накопители</div>
            <div className="char">
              <div className="char_name">Общий объем SSD</div>
              <div className="char_value">{data.total_volume_SSD} ГБ</div>
            </div>
            <div className="char_title">Прочее</div>
            <div className="char">
              <div className="char_name">Гарантия</div>
              <div className="char_value">{data.warranty} мес.</div>
            </div>
            <div className="char">
              <div className="char_name">Материал</div>
              <div className="char_value">{data.material}</div>
            </div>
            <div className="char">
              <div className="char_name">Сканер отпечатков пальцев</div>
              <div className="char_value">{checkAvailability(data.fingerprint_scanner)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}