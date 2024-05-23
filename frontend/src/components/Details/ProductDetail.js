import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './Details.css';
import product from './/example_products_photo/1.webp';
import axios from "axios";
import priceFormatter from "../../utils/priceFormatter";

export default function ProductDetail() {
  const [data, setData] = useState([]);
  const { uuid } = useParams();

  useEffect(() => {
    getProductDetails()
  }, [])

  const getProductDetails = () => {
    axios
      .get(`/api/products/${uuid}/`)
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

  if (data.product_type === 'computer')
    return (
      <div className="container">
        <h1 className="header">{data.name}</h1>
        <div className="details">
          <div className="pictures">
            <img className="image" src={data.image ? `http://localhost:8000/api/files/products/images/${data.image.id}` : product} alt="product"></img>
          </div>
          <div className="text_right">
            <div className="full_name">{data.description}</div>
            <div className="top_buttons">
              <div className="compare">Сравнить</div>
              <div className="rating">Рейтинг</div>
              <div className="comments"><img className="icons_0" width="30" height="30" src="https://img.icons8.com/windows/32/chat.png" alt="Chat" /></div>
              <div className="reliability">Надёжность</div>
              <div className="share"><img className="icons_0" width="30" height="30" src="https://img.icons8.com/windows/32/share-2.png" alt="share" /></div>
            </div>
            <div className="mid_buttons">
              <div className="price">{priceFormatter(Math.floor(data.price))} ₽</div>
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
  else return (
    <div className="container">
      <h1 className="header">{data.name}</h1>
      <div className="details">
        <div className="pictures">
          <img className="image" src={data.image ? `http://localhost:8000/api/files/products/images/${data.image.id}` : product} alt="product"></img>
        </div>
        <div className="text_right">
          <div className="full_name">{data.description}</div>
          <div className="top_buttons">
            <div className="compare">Сравнить</div>
            <div className="rating">Рейтинг</div>
            <div className="comments"><img className="icons_0" width="30" height="30" src="https://img.icons8.com/windows/32/chat.png" alt="Chat" /></div>
            <div className="reliability">Надёжность</div>
            <div className="share"><img className="icons_0" width="30" height="30" src="https://img.icons8.com/windows/32/share-2.png" alt="share" /></div>
          </div>
          <div className="mid_buttons">
            <div className="price">{priceFormatter(Math.floor(data.price))} ₽</div>
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
            <div className="char_title">Заводские данные</div>
            <div className="char">
              <div className="char_name">Гарантия</div>
              <div className="char_value">{data.warranty} мес.</div>
            </div>
            <div className="char_title">Общие параметры</div>
            <div className="char">
              <div className="char_name">Модель</div>
              <div className="char_value">{data.phone_model}</div>
            </div>
            <div className="char">
              <div className="char_name">Код производителя</div>
              <div className="char_value">{data.code}</div>
            </div>
            <div className="char">
              <div className="char_name">Год релиза</div>
              <div className="char_value">{data.release}</div>
            </div>
            <div className="char_title">Внешний вид</div>
            <div className="char">
              <div className="char_name">Цвет задней панели</div>
              <div className="char_value">{data.back_color}</div>
            </div>
            <div className="char">
              <div className="char_name">Цвет граней</div>
              <div className="char_value">{data.side_color}</div>
            </div>
            <div className="char">
              <div className="char_name">Цвет, заявленный производителем</div>
              <div className="char_value">{data.declared_color}</div>
            </div>
            <div className="char_title">Мобильная связь</div>
            <div className="char">
              <div className="char_name">Формат SIM-карт</div>
              <div className="char_value">{data.sim_format}</div>
            </div>
            <div className="char">
              <div className="char_name">Количество физических SIM-карт</div>
              <div className="char_value">{data.physical_sim_count}</div>
            </div>
            <div className="char">
              <div className="char_name">Количество eSIM</div>
              <div className="char_value">{data.esim_count}</div>
            </div>
            <div className="char_title">Экран</div>
            <div className="char">
              <div className="char_name">Диагональ экрана (дюйм)</div>
              <div className="char_value">{data.screen_diagonal}"</div>
            </div>
            <div className="char">
              <div className="char_name">Частота обновления экрана</div>
              <div className="char_value">{data.refresh_rate} Гц</div>
            </div>
            <div className="char">
              <div className="char_name">Плотность пикселей</div>
              <div className="char_value">{data.ppi} ppi</div>
            </div>
            <div className="char">
              <div className="char_name">Соотношение сторон</div>
              <div className="char_value">{data.aspect_ratio}</div>
            </div>
            <div className="char">
              <div className="char_name">Количество цветов экрана</div>
              <div className="char_value">{data.color_depth} млн</div>
            </div>
            <div className="char_title">Конструкция и защита</div>
            <div className="char">
              <div className="char_name">Тип корпуса</div>
              <div className="char_value">{data.body_type}</div>
            </div>
            <div className="char">
              <div className="char_name">Материал корпуса</div>
              <div className="char_value">{data.body_material}</div>
            </div>
            <div className="char_title">Операционная система и процессор</div>
            <div className="char">
              <div className="char_name">Операционная система</div>
              <div className="char_value">{data.os}</div>
            </div>
            <div className="char">
              <div className="char_name">Версия ОС</div>
              <div className="char_value">{data.os_version}</div>
            </div>
            <div className="char">
              <div className="char_name">Модель процессора</div>
              <div className="char_value">{data.processor_model}</div>
            </div>
            <div className="char">
              <div className="char_name">Количество ядер</div>
              <div className="char_value">{data.number_of_cores}</div>
            </div>
            <div className="char">
              <div className="char_name">Максимальная частота процессора</div>
              <div className="char_value">{data.max_processor_frequency}</div>
            </div>
            <div className="char_title">Память</div>
            <div className="char">
              <div className="char_name">Объем оперативной памяти</div>
              <div className="char_value">{data.ram_capacity} ГБ</div>
            </div>
            <div className="char">
              <div className="char_name">Объем встроенной памяти</div>
              <div className="char_value">{data.internal_storage} ГБ</div>
            </div>
            <div className="char_title">Основная (тыловая) камера</div>
            <div className="char">
              <div className="char_name">Количество основных (тыловых) камер</div>
              <div className="char_value">{data.main_camera_count}</div>
            </div>
            <div className="char">
              <div className="char_name">Количество мегапикселей основной камеры</div>
              <div className="char_value">{data.main_camera_resolution} Мп</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}