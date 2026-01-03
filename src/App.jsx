import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Heart, UserCog, ChevronLeft, CheckCircle, Send,
  RefreshCw, Phone, BarChart2, Table as TableIcon, School, Lock, Loader2, MessageSquare
} from 'lucide-react';

// --- ГЛОБАЛЬНІ КОНСТАНТИ ---
const LOGO_URL = "https://www.dropbox.com/scl/fi/7vozhxm3sp6slzq4nr6p1/krp_Dnipro_logo_or.png?rlkey=97lduwpf0cbaiai8ght99wb5s&st=boduc151&raw=1";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzBqsS7kM0xOSXEtPbICf3VWRqWu-pZStRQ_9hloPnt9jHieIiPH8bC0iB_Rci-aVQz2g/exec";

const SCHOOLS_LIST = [
  "Дніпровський ліцей № 1", "Дніпровський ліцей № 3", "Дніпровський ліцей № 7", "Дніпровський ліцей № 9",
  "Дніпровський ліцей № 12", "Дніпровський ліцей № 15", "Дніпровський ліцей № 21", "Дніпровський ліцей № 22",
  "Дніпровський ліцей № 23", "Дніпровський ліцей № 28", "Дніпровський ліцей № 31", "Дніпровський ліцей № 33",
  "Дніпровський ліцей № 36", "Дніпровський ліцей № 42", "Дніпровський ліцей № 53", "Дніпровський ліцей № 54",
  "Дніпровський ліцей № 57", "Дніпровський ліцей № 61", "Дніпровський ліцей № 67", "Дніпровський ліцей № 70",
  "Дніпровський ліцей № 81", "Дніпровський ліцей № 91", "Дніпровський ліцей № 97", "Дніпровський ліцей № 100",
  "Дніпровський ліцей № 111", "Дніпровський ліцей № 120", "Дніпровський ліцей № 123", "Дніпровський ліцей № 126",
  "Дніпровський ліцей № 129", "Дніпровський ліцей № 130", "Дніпровський ліцей № 134", "Дніпровський ліцей № 137",
  "Дніпровський ліцей № 138", "Дніпровський ліцей № 139", "Дніпровський ліцей № 142", "Дніпровський ліцей № 144",
  "Дніпровський ліцей № 145",
  "Альтерра Скул Дніпро", "Ліцей Борисфен", "Ліцей Європейська гімназія", "Ліцей митно-податкової справи",
  "Ліцей Синергія", "Ліцей Сокіл", "Ліцей Стежинка мудрості", "Ліцей сучасної освіти",
  "Ліцей сучасного покоління", "Ліцей Happy Learning", "Ліцей Цитадель", "Міський юридичний ліцей",
  "Науковий ліцей ІТ", "Науковий ліцей імені Хаї-Мушки Шнеєрсон", "Науковий ліцей міжнародних відносин УМСФ",
  "Науковий ліцей цифрових технологій УДУНТ", "Науковий медичний ліцей Дніпро", "Науковий українсько-американський ліцей",
  "Науковий фізико-математичний ліцей", "Науковий фінансово-економічний ліцей", "Науковий хіміко-екологічний ліцей",
  "Онлайн школа 977", "Свято-Успенський ліцей", "Технічний ліцей"
];

const SURVEY_DATA = {
  applicant: [
    { id: 1, key: "абі_q1", q: "У якому закладі освіти ти наразі навчаєшся (обери із запропонованих або напиши власноруч)?", type: "school" },
    { id: 2, key: "абі_q2", q: "Підкажи, будь ласка, твій поточний статус проживання:", type: "choice", o: ["Мешкаю у м. Дніпро (постійно)", "Мешкаю в області", "ВПО у Дніпрі", "Інше місто України", "Мешкаю за кордоном"] },
    { id: 3, key: "абі_q3", q: "Який твій найбільший страх перед вибором спеціальності, професії?", type: "choice", o: ["Страх помилитися з вибором", "Страх не знайти роботу", "Страх не скласти НМТ", "Фінансові обмеження родини"] },
    { id: 4, key: "абі_q4", q: "Чи визначений тобою перелік закладів освіти для вступу?", type: "boolean" },
    { id: 5, key: "абі_q5", q: "Обери пріоритетний професійний кластер:", type: "choice", o: ["IT та Цифрові технології", "Інженерія та Робототехніка", "Оборона, Безпека та Дрони", "Економіка та Маркетинг", "Аграрна або гуманітарна сфера", "Медицина та Психологія", "Право та Соціальна сфера"] },
    { id: 6, key: "абі_q6", q: "Чи розглядаєш ти Дніпро як місто для вступу 2026?", type: "choice", o: ["Так, тільки Дніпро", "Дніпро - пріоритет", "Інше місто України", "Планую виїзд за кордон"] },
    { id: 7, key: "абі_q7", q: "Який стимул змусить тебе обрати рідне місто?", type: "choice", o: ["Гарантована робота", "Сучасні інноваційні хаби", "Можливість реально впливати на розвиток міста", "Близькість до родини"] },
    { id: 8, key: "абі_q8", q: "Наскільки безпека проживання та укриття впливають на твій вибір?", type: "slider", l: "Не важливо;Критично" },
    { id: 9, key: "абі_q9", q: "Чи знаєш ти про систему державних грантів на навчання?", type: "boolean" },
    { id: 10, key: "абі_q10", q: "Яка модель фінансування освіти для тебе є найбільш прийнятною?", type: "choice", o: ["Тільки бюджет", "Контракт за власні кошти", "Поєднання гранту та контракту", "Будь-який варіант"] },
    { id: 11, key: "абі_q11", q: "Оціни рівень твоєї довіри до офіційної реклами університетів (сайт, офіційні новини, ЗМІ):", type: "slider", l: "Не довіряю;Повністю" },
    { id: 12, key: "абі_q12", q: "Яка платформа приіоритетна для тебе у вивченні ЗВО?", type: "choice", o: ["Сайт університету", "TikTok", "Telegram", "Instagram", "YouTube"] },
    { id: 13, key: "абі_q13", q: "Наскільки для тебе важливі відгуки (особисті, в мережевих ресурсах) від реальних студентів?", type: "slider", l: "Не важливо;Дуже важливо" },
    { id: 14, key: "абі_q14", q: "Який формат знайомства із закладом для тебе є найкращим?", type: "choice", o: ["Візит представників ЗВО до мого закладу", "Віртуальний 3D-тур", "Відвідування Дня відкритих дверей", "Спілкування з чат-ботом (ШІ)"] },
    { id: 15, key: "абі_q15", q: "Чи плануєш ти поєднувати роботу з навчанням уже з 1-го курсу?", type: "boolean" },
    { id: 16, key: "абі_q16", q: "Що найважливіше для твого успішного старту в нашому місті?", type: "choice", o: ["Центр кар'єри", "Стартап-коворкінги", "Міські стипендії", "Зв'язок з бізнесом"] },
    { id: 17, key: "абі_q17", q: "Який наразі рівень твоєї тривоги щодо вступу у 2026 році?", type: "slider", l: "Спокійний;Паніка" },
    { id: 18, key: "абі_q18", q: "Чи розглядаєш ти училище або коледж як альтернативу університету?", type: "boolean" },
    { id: 19, key: "абі_q19", q: "Наскільки часто ти готовий (готова) комунікувати з ЗВО щодо вступу?", type: "choice", o: ["Достатньо одного знайомста", "2-3 рази", "Скільки завгодно, якщо в цьому є необхідність", "Це не обов'язково, можу прийняти спонтанне рішення"] },
    { id: 20, key: "абі_q20", q: "Який тип комунікації допоможе тобі визначити пріоритет №1?", type: "choice", o: ["Діалог зі студентами", "Тест-драйв професії", "Консультація", "Інфографіка ЗВО", "Соціальні мережі"] },
    { id: 21, key: "абі_q21", q: "Чи цікавлять тебе програми міжнародного обміну (зокрема, Erasmus+)?", type: "boolean" },
    { id: 22, key: "абі_q22", q: "Наскільки бренд та історія ЗВО додають йому цінності?", type: "slider", l: "Не додають;Дуже додають" },
    { id: 23, key: "абі_q23", q: "Чи є у тебе готовність обрати професію для відбудови Дніпра?", type: "boolean" },
    { id: 24, key: "абі_q24", q: "Який тип контенту хочеш бачити найчастіше?", type: "choice", o: ["Життя студента", "Аналітика зарплат", "Тури аудиторіями і лабами", "Інструкції до НМТ"] },
    { id: 25, key: "абі_q25", q: "Твоя головна пропозиція Раді з професійної орієнтації:", type: "text" }
  ],
  parent: [
    { id: 1, key: "бат_q1", q: "Хто є ініціатором вибору ЗВО у вашій родині?", type: "choice", o: ["Дитина", "Батьки", "Вчителі", "Спільне рішення"] },
    { id: 2, key: "бат_q2", q: "Що для вас є пріоритетом: безпека чи престиж?", type: "slider", l: "Безпека;Престиж" },
    { id: 3, key: "бат_q3", q: "Чи вважаєте ви Дніпро безпечним для навчання дитини?", type: "boolean" },
    { id: 4, key: "бат_q4", q: "Чи знайомі ви з правилами грантового фінансування:", type: "slider", l: "Не знаю;Знаю все" },
    { id: 5, key: "бат_q5", q: "Прийнятний фінансовий варіант (контракт грн/рік):", type: "choice", o: ["Бюджет", "До 30к", "30-50к", "50-80к", "Понад 80к"] },
    { id: 6, key: "бат_q6", q: "Оцініть рівень профорієнтаційного інформування:", type: "slider", l: "Низький;Високий" },
    { id: 7, key: "бат_q7", q: "Ваша оцінка рівня вищої освіти в Дніпрі порівняно з країною?", type: "slider", l: "Нижче;Вище" },
    { id: 8, key: "бат_q8", q: "Фактор вибору навчання за кордоном:", type: "choice", o: ["Безпека", "Диплом", "Якість практики", "Майбутнє там"] },
    { id: 9, key: "бат_q9", q: "Важливість партнерства ЗВО з бізнесом Дніпра:", type: "slider", l: "Не важливо;Дуже важливо" },
    { id: 10, key: "бат_q10", q: "Найзручніший канал для отримання інформації:", type: "choice", o: ["Сайт ЗВО", "Месенджери", "Телефон", "Зустріч"] },
    { id: 11, key: "бат_q11", q: "Чи вважаєте ви НМТ справедливою системою?", type: "slider", l: "Ні;Так" },
    { id: 12, key: "бат_q12", q: "Ваша довіра до реклами університетів у соцмережах:", type: "slider", l: "Низька;Висока" },
    { id: 13, key: "бат_q13", q: "Чи важлива для вашої родини наявність гуртожитку?", type: "boolean" },
    { id: 14, key: "бат_q14", q: "Ставлення до дуальної освіти (робота + навчання):", type: "slider", l: "Негативне;Позитивне" },
    { id: 15, key: "бат_q15", q: "Чи користуєтеся ви послугами репетиторів?", type: "boolean" },
    { id: 16, key: "бат_q16", q: "Чи впливає наявність укриття на згоду оплачувати контракт?", type: "boolean" },
    { id: 17, key: "бат_q17", q: "Оцінка роботи влади у підтримці молоді:", type: "slider", l: "Низька;Висока" },
    { id: 18, key: "бат_q18", q: "Чи плануєте відвідувати заходи разом з дитиною?", type: "boolean" },
    { id: 19, key: "бат_q19", q: "Яка інформація від ЗВО для вас найактуальніша?", type: "choice", o: ["Умови вступу", "Відгуки знайомих", "Перспективи навчання", "Гуртожиток", "Робота за фахом"] },
    { id: 20, key: "бат_q20", q: "Ваша ключова порада Раді профорієнтації:", type: "text" }
  ],
  teacher: [
    { id: 1, key: "осв_q1", q: "Рівень зацікавленості учнів у ЗВО м. Дніпра:", type: "slider", l: "Низький;Високий" },
    { id: 2, key: "осв_q2", q: "Найпопулярніші спеціальності серед випускників:", type: "choice", o: ["IT", "Інженерія", "Оборона", "Економіка", "Гуманітарні", "Медицина", "Право"] },
    { id: 3, key: "осв_q3", q: "Ефективний формат співпраці ЗВО-Школа:", type: "choice", o: ["Майстер-класи", "Екскурсії", "Олімпіади", "Лекції"] },
    { id: 4, key: "осв_q4", q: "Формати співпраці, які вас цікавлять:", type: "choice", o: ["Заняття від ЗВО", "Хакатони", "Проєкти з бізнесом", "Підвищення кваліфікації"] },
    { id: 5, key: "осв_q5", q: "Наскільки батьки впливають на вибір учнів?", type: "slider", l: "Слабко;Сильно" },
    { id: 6, key: "осв_q6", q: "Чи доцільна підтримка гейміфікації профорієнтації:", type: "boolean" },
    { id: 7, key: "осв_q7", q: "Головна проблема вступної кампанії 2026:", type: "choice", o: ["Відтік", "НМТ", "Інфошум", "Безпека"] },
    { id: 8, key: "осв_q8", q: "Об'єктивність оцінювання через НМТ:", type: "slider", l: "Низька;Висока" },
    { id: 9, key: "осв_q9", q: "Оцініть інтерес випускників до інженерних професій:", type: "boolean" },
    { id: 10, key: "осв_q10", q: "Роль соцмереж у виборі абітурієнта:", type: "slider", l: "Мінімальна;Вирішальна" },
    { id: 11, key: "осв_q11", q: "Чи задоволені ви співпрацею із ЗВО Дніпра?", type: "slider", l: "Ні;Так" },
    { id: 12, key: "осв_q12", q: "Меседж Дніпра для втримання талантів:", type: "choice", o: ["Хаб інновацій", "Робоче місце тут", "Місто-фортеця", "Можливості стартапів"] },
    { id: 13, key: "осв_q13", q: "Рівень використання вами ШІ у роботі з учнями:", type: "boolean" },
    { id: 14, key: "осв_q14", q: "Що найбільше демотивує випускників залишатися в регіоні?", type: "choice", o: ["Рівень освіти", "Безпека", "Зарплати", "Від'їзд друзів", "База ЗВО"] },
    { id: 15, key: "осв_q15", q: "Частота звернень учнів за порадою щодо професії:", type: "slider", l: "Рідко;Постійно" },
    { id: 16, key: "осв_q16", q: "Чи вважаєте ви систему грантів справедливою?", type: "boolean" },
    { id: 17, key: "осв_q17", q: "Чи є доцільність у курсах профорієнтації для вчителів?", type: "boolean" },
    { id: 18, key: "осв_q18", q: "Вирішальний фактор при виборі Дніпра як хабу:", type: "choice", o: ["Зв'язок з бізнесом", "Інновації", "Стипендії", "Житло"] },
    { id: 19, key: "осв_q19", q: "Рівень стресу випускників перед вступом-2026:", type: "slider", l: "Низький;Високий" },
    { id: 20, key: "осв_q20", q: "Ваша пропозиція Координаційній Раді:", type: "text" }
  ]
};

// --- ДОПОМІЖНІ КОМПОНЕНТИ ---

const RingChart = ({ data, qKey, hoveredData, setHoveredData }) => {
  const list = Array.isArray(data) ? data : [];
  if (list.length === 0) return <div className="text-slate-300 italic text-sm py-10 text-center">Дані синхронізуються...</div>;
  
  let currentAngle = 0;
  const colors = ['#f97316', '#64748b', '#0f172a', '#f59e0b', '#334155'];
  const radius = 35;
  const center = 50;

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="relative w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {list.map((item, i) => {
            const startAngle = currentAngle;
            const sliceAngle = (item.percent / 100) * 360;
            currentAngle += sliceAngle;
            const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = center + radius * Math.cos(((startAngle + sliceAngle) * Math.PI) / 180);
            const y2 = center + radius * Math.sin(((startAngle + sliceAngle) * Math.PI) / 180);
            const largeArcFlag = sliceAngle > 180 ? 1 : 0;
            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                fill="none" stroke={colors[i % colors.length]} strokeWidth="11"
                className="transition-all duration-300 cursor-pointer hover:stroke-[13] drop-shadow-sm"
                onMouseEnter={() => setHoveredData({ key: qKey, ...item })}
                onMouseLeave={() => setHoveredData(null)}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
           {hoveredData?.key === qKey ? (
             <div className="animate-in fade-in zoom-in duration-300">
               <span className="text-4xl font-black text-orange-600 leading-none">{hoveredData.percent}%</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 block text-center leading-tight">{hoveredData.count} анкет</span>
             </div>
           ) : <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center leading-tight">Наведіть на сегмент</span>}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4 w-full px-4">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            <span className="text-[12px] font-bold text-slate-600 leading-none text-left">{String(item.label)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HorizontalBarChart = ({ data, isCompact = false }) => {
  const list = Array.isArray(data) ? data : [];
  if (list.length === 0) return (
    <div className="flex flex-col items-center justify-center h-48 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
      <Loader2 className="animate-spin text-slate-200 mb-2" size={32} />
      <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Синхронізація...</p>
    </div>
  );

  return (
    <div className={`w-full p-2 text-slate-900 ${isCompact ? 'space-y-3' : 'space-y-5'}`}>
      {list.map((item, i) => (
        <div key={i} className="group text-left text-slate-900">
          <div className={`flex justify-between items-end px-1 ${isCompact ? 'mb-1' : 'mb-2'}`}>
            <span className={`font-bold text-slate-700 truncate leading-tight ${isCompact ? 'text-sm max-w-[65%]' : 'text-base max-w-[70%]'}`}>
              {String(item.label)}
            </span>
            <span className={`font-black text-orange-600 whitespace-nowrap ml-2 leading-none ${isCompact ? 'text-xs' : 'text-sm'}`}>
              {item.count} анкет ({item.percent}%)
            </span>
          </div>
          <div className={`${isCompact ? 'h-3' : 'h-4'} w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner`}>
             <div 
               className={`h-full transition-all duration-1000 ease-out ${i === 0 ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-slate-400 opacity-60'}`} 
               style={{ width: `${item.percent}%` }} 
             />
          </div>
        </div>
      ))}
    </div>
  );
};

const Footer = ({ onAdminClick }) => (
  <div className="w-full py-8 mt-auto flex flex-col items-center">
    <div className="w-full text-center border-t border-slate-100 pt-6 px-4">
      <p className="text-slate-400 font-bold text-base md:text-lg tracking-wide uppercase leading-relaxed max-w-4xl mx-auto text-center">
        Розроблено за ініціативи Ради з професійної орієнтації молоді міста Дніпра
      </p>
    </div>
    <div 
      onClick={onAdminClick} 
      className="mt-6 w-32 h-1 bg-transparent hover:bg-orange-500/30 transition-all duration-700 cursor-pointer rounded-full" 
    />
  </div>
);

// --- ОСНОВНИЙ КОМПОНЕНТ APP ---

export default function App() {
  const [step, setStep] = useState('gate'); 
  const [currentRole, setCurrentRole] = useState('');
  const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [captcha, setCaptcha] = useState({ q: '', a: 0 });
  const [captchaInput, setCaptchaInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [adminAuth, setAdminAuth] = useState({ login: '', pass: '' });
  const [realStats, setRealStats] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [adminTab, setAdminTab] = useState('applicant');
  const [hoveredData, setHoveredData] = useState(null);

  useEffect(() => {
    generateCaptcha();
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 5;
    const n2 = Math.floor(Math.random() * 10) + 2;
    setCaptcha({ q: `${n1} + ${n2} =`, a: n1 + n2 });
    setCaptchaInput('');
  };

  const calculateProgress = () => {
    const questions = SURVEY_DATA[currentRole] || [];
    if (questions.length === 0) return 0;
    const answered = questions.filter(q => q.type === 'slider' || (formData[q.key] !== undefined && String(formData[q.key]).trim() !== "")).length;
    return Math.round((answered / questions.length) * 100);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!userData.firstName.trim() || !userData.lastName.trim() || userData.phone.length < 9) {
      setErrorMsg("Будь ласка, заповніть обов'язкові поля.");
      return;
    }
    if (parseInt(captchaInput) !== captcha.a) {
      setErrorMsg("Перевірка не пройдена.");
      generateCaptcha();
      return;
    }
    setStep('home');
  };

  const fetchRealStats = async () => {
    setIsAdminLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getStats`);
      const data = await response.json();
      setRealStats(data);
      setStep('admin-dash');
    } catch (err) {
      setErrorMsg("Синхронізація не вдалася.");
    } finally {
      setIsAdminLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminAuth.login === 'admin' && adminAuth.pass === 'dnipro2026') fetchRealStats();
    else setErrorMsg("Доступ заборонено.");
  };

  const handleInputChange = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));
  const resetSurvey = () => { setFormData({}); setCurrentRole(''); setStep('home'); };

  const handleFinish = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const finalData = { ...formData };
    SURVEY_DATA[currentRole].forEach(q => { if (q.type === 'slider' && finalData[q.key] === undefined) finalData[q.key] = "3"; });
    
    const payload = { 
      "timestamp": new Date().toLocaleString('uk-UA'),
      "fullname": `${userData.firstName} ${userData.lastName}`, 
      "phone": "+380" + userData.phone, 
      "email": userData.email, 
      "role": currentRole,
      "Час подання": new Date().toLocaleString('uk-UA'),
      "Ім'я та Прізвище": `${userData.firstName} ${userData.lastName}`,
      "Телефон": "+380" + userData.phone,
      "Email": userData.email
    };

    SURVEY_DATA[currentRole].forEach(q => {
      payload[q.key] = finalData[q.key] || "";
      payload[q.q] = finalData[q.key] || "";
    });
    
    try {
      await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload), mode: 'no-cors' });
      setStep('success');
    } catch (err) {
      setErrorMsg("Помилка відправки.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const findDataForQuestion = (q, details) => {
    if (!details || typeof details !== 'object') return [];
    if (details[q.key] && Array.isArray(details[q.key])) return details[q.key];
    const keys = Object.keys(details);
    const normalize = (s) => String(s).toLowerCase().replace(/['’`«»]/g, '').replace(/ти|ви|тебе|вас|вам|тобі|твій|ваш|у|в|чи|на|із|і/g, '').replace(/[?.,!:\s-]/g, '');
    const target = normalize(q.q);
    const foundKey = keys.find(k => {
      const current = normalize(k);
      return current.includes(target) || target.includes(current) || k.includes(`q${q.id}`);
    });
    return (foundKey && Array.isArray(details[foundKey])) ? details[foundKey] : [];
  };

  // --- RENDERING ADMIN DASHBOARD ---

  if (step === 'admin-dash') {
    const stats = realStats || { total: 0, categories: { applicant: 0, parent: 0, teacher: 0 }, details: { applicant: {}, parent: {}, teacher: {} } };
    const safeDetails = stats?.details || { applicant: {}, parent: {}, teacher: {} };
    const questions = SURVEY_DATA[adminTab] || [];
    const details = safeDetails[adminTab] || {};
    const lastQ = questions[questions.length - 1];
    const schoolQ = questions.find(q => q.type === 'school');

    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col p-6 font-['Nunito'] text-slate-900">
        <div className="max-w-[1400px] mx-auto w-full text-slate-900 text-left">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
            <div className="text-center md:text-left text-slate-950">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Аналітичний Центр</h1>
              <p className="text-xl font-bold text-slate-500 uppercase mt-4 italic tracking-widest text-slate-900 leading-none">Моніторинг опитування 2026</p>
            </div>
            <button onClick={() => setStep('home')} className="flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg font-black uppercase hover:bg-orange-500 hover:text-white transition-all border-2 border-slate-100 text-slate-900 leading-none">
              <ChevronLeft size={24} /> Вихід
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 text-slate-900 text-center">
            <div className="bg-slate-950 p-6 rounded-[2.5rem] text-white flex flex-col justify-center shadow-xl border-b-8 border-orange-500">
              <p className="text-[10px] font-black uppercase opacity-60 mb-1 leading-none text-white">Всього анкет</p>
              <p className="text-5xl font-black text-white leading-none text-center">{stats.total || 0}</p>
            </div>
            {['applicant', 'parent', 'teacher'].map(k => (
              <div key={k} onClick={() => setAdminTab(k)} className={`cursor-pointer p-6 rounded-[2.5rem] border-4 transition-all flex flex-col justify-center ${adminTab === k ? 'bg-white border-orange-500 shadow-2xl scale-105' : 'bg-white border-slate-100 hover:border-orange-300'}`}>
                <p className={`text-[10px] font-black uppercase mb-1 leading-none text-center ${adminTab === k ? 'text-orange-500' : 'text-slate-400'}`}>{k === 'applicant' ? 'Абітурієнти' : k === 'parent' ? 'Батьки' : 'Освітяни'}</p>
                <p className="text-4xl font-black text-slate-950 leading-none text-center">{stats.categories?.[k] || 0}</p>
              </div>
            ))}
          </div>

          {adminTab === 'applicant' && schoolQ && (
            <div className="bg-white p-10 rounded-[4rem] shadow-xl border-2 border-slate-50 mb-10 text-slate-900">
              <div className="flex items-start gap-4 mb-8 border-b pb-6 text-slate-900 text-left">
                <School size={36} className="text-orange-600 mt-1" />
                <div className="text-left text-slate-900">
                   <h3 className="text-2xl font-black text-slate-950 leading-tight">{schoolQ.q}</h3>
                   <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Рейтинг активності за закладами освіти (прокручуйте)</p>
                </div>
              </div>
              <div className="max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-slate-100">
                <HorizontalBarChart data={findDataForQuestion(schoolQ, details)} isCompact={true} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 text-slate-900 text-left">
            {questions.map((q) => {
              if (q.type === 'school' || q.type === 'text') return null;
              const qData = findDataForQuestion(q, details);
              const useRing = adminTab === 'applicant' && q.type !== 'slider';

              return (
                <div key={q.key} className="bg-white p-10 rounded-[4rem] shadow-xl border-2 border-slate-50 flex flex-col min-h-[500px]">
                  <div className="flex items-start gap-4 mb-10 text-slate-900 text-left">
                    <span className="bg-slate-100 text-slate-950 w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black border border-slate-200 shrink-0 leading-none text-slate-950 text-center">{q.id}</span>
                    <h3 className="text-xl font-black leading-tight text-slate-950 leading-snug text-left">{q.q}</h3>
                  </div>
                  <div className="flex-grow flex items-center justify-center text-slate-900 text-center">
                    {useRing ? (
                      <RingChart data={qData} qKey={q.key} hoveredData={hoveredData} setHoveredData={setHoveredData} />
                    ) : (
                      <HorizontalBarChart data={qData} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-[4rem] shadow-2xl border-2 border-slate-100 overflow-hidden mb-12 text-slate-900 text-left">
            <div className="bg-slate-50 p-10 border-b border-slate-100 flex items-center gap-6 text-slate-900">
              <MessageSquare size={44} className="text-orange-500" />
              <div className="text-left">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-950 leading-none text-left">Головні пропозиції раді</h3>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2 leading-none text-left">Пряма мова від респондентів ({adminTab === 'applicant' ? 'Абітурієнти' : adminTab === 'parent' ? 'Батьки' : 'Освітяни'})</p>
              </div>
            </div>
            <div className="p-8 max-h-[600px] overflow-y-auto bg-white text-slate-900 text-left">
              <table className="w-full border-separate border-spacing-y-4 text-left">
                <tbody>
                  {(findDataForQuestion(lastQ, details)).length > 0 ? (findDataForQuestion(lastQ, details)).map((item, i) => (
                    <tr key={i}><td className="bg-slate-50 p-8 rounded-3xl border-l-8 border-orange-500 shadow-sm text-xl font-bold leading-relaxed text-slate-800 italic text-left">«{String(item.label)}»</td></tr>
                  )) : (
                    <tr><td className="text-center p-20 text-slate-300 uppercase font-black tracking-widest italic leading-none text-center">Пропозицій поки не надходило</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer onAdminClick={() => setStep('admin-auth')} />
      </div>
    );
  }

  if (step === 'gate') return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-['Nunito'] text-slate-900 text-center">
      <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-10 md:p-14 border-2 border-slate-200 transition-all text-slate-900">
        <div className="mx-auto mb-10 flex justify-center text-slate-900 text-center leading-none"><img src={LOGO_URL} alt="Logo" className="w-full h-auto object-contain" /></div>
        <p className="text-orange-500 font-black mb-2 text-center text-4xl md:text-5xl leading-tight uppercase text-orange-500 leading-none">Впливай на майбутнє Дніпра вже сьогодні</p>
        <h2 className="text-xl font-black text-slate-950 mb-10 text-center uppercase tracking-tight leading-none opacity-60">Верифікація</h2>
        <form onSubmit={handleVerify} className="space-y-8 text-left font-black">
          <div className="space-y-6">
            {[
              { l: 'Ім\'я', f: 'firstName', type: 'text' },
              { l: 'Прізвище', f: 'lastName', type: 'text' },
              { l: 'Телефон', f: 'phone', type: 'tel' },
              { l: 'Email', f: 'email', type: 'email' }
            ].map((field, i) => (
              <div key={i} className="space-y-2 text-left">
                <label className="text-3xl font-black ml-4 flex items-center leading-none text-slate-900">{field.l} {field.f !== 'email' && <span className="text-red-600 ml-1 leading-none">*</span>}</label>
                {field.f === 'phone' ? (
                  <div className="relative group leading-none text-left"><div className="absolute left-8 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-950 leading-none"><span className="text-orange-600 leading-none">+380</span></div>
                  <input required type="tel" maxLength="9" value={userData.phone} className="w-full p-6 pl-32 bg-slate-50 border-2 border-slate-300 rounded-[2rem] font-black text-3xl shadow-inner text-slate-950 outline-none focus:border-orange-500 focus:bg-white transition-all leading-none" onChange={e => setUserData({...userData, phone: e.target.value.replace(/\D/g, '')})} /></div>
                ) : (
                  <input required={field.f !== 'email'} type={field.type} value={userData[field.f]} className="w-full p-6 bg-slate-50 border-2 border-slate-300 rounded-[2rem] font-black text-2xl shadow-inner text-slate-950 outline-none focus:border-orange-500 focus:bg-white transition-all leading-none" onChange={e => setUserData({...userData, [field.f]: e.target.value})} />
                )}
              </div>
            ))}
          </div>
          <div className="bg-orange-50 p-6 rounded-[2.5rem] border-2 border-orange-300 flex items-center justify-between text-slate-900 leading-none">
            <span className="text-3xl font-black text-orange-950 leading-none">{captcha.q}</span>
            <input required type="number" value={captchaInput} className="w-28 p-4 bg-white border-2 border-orange-400 rounded-[2rem] text-center font-black text-3xl text-orange-700 outline-none focus:border-orange-600 shadow-md leading-none text-orange-700" onChange={e => setCaptchaInput(e.target.value)} />
          </div>
          <button type="submit" className="w-full py-8 bg-orange-500 text-white rounded-[2rem] font-black uppercase text-3xl shadow-xl hover:bg-orange-600 active:scale-95 transition-all text-white leading-none">Увійти</button>
        </form>
      </div>
      <Footer onAdminClick={() => setStep('admin-auth')} />
    </div>
  );

  if (step === 'home') return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-8 font-['Nunito'] text-slate-900 text-center">
      <div className="flex flex-col items-center justify-center flex-grow text-slate-900 text-center">
        <div className="mb-10 p-6 bg-white rounded-[3.5rem] shadow-sm border-2 border-slate-200 w-[560px] overflow-hidden text-slate-900 leading-none text-center"><img src={LOGO_URL} alt="Logo" className="w-full h-auto object-contain" /></div>
        <h2 className="text-4xl md:text-[5rem] font-black text-slate-950 mb-10 tracking-tighter leading-[0.9] text-slate-900 uppercase">Дніпро – твій <span className="text-orange-500 underline decoration-[8px] underline-offset-[16px]">дім!</span></h2>
        
        <div className="text-2xl md:text-[3.5rem] font-black mb-20 max-w-[1400px] leading-[1.1] tracking-tight text-slate-900 text-center uppercase text-slate-950">
          <p>Твій голос – це фундамент стратегії нашої громади на 2026 рік.</p>
          <p className="text-orange-500 mt-6">Побудуємо майбутнє разом!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl px-4 text-slate-900 leading-none">
          {[
            { id: 'applicant', label: 'Абітурієнт', icon: <GraduationCap size={44} />, desc: 'Вступ 2026' },
            { id: 'parent', label: 'Батьки', icon: <Heart size={44} />, desc: 'Вибір родини' },
            { id: 'teacher', label: 'Освітяни', icon: <UserCog size={44} />, desc: 'Експертний погляд' }
          ].map(role => (
            <button key={role.id} onClick={() => { setCurrentRole(role.id); setStep('survey'); }} className="bg-white p-12 rounded-[4rem] border-2 border-slate-300 shadow-lg hover:border-orange-500 hover:shadow-2xl hover:-translate-y-3 transition-all group flex flex-col items-center relative overflow-hidden text-slate-900 text-center text-slate-950 leading-none">
              <div className="text-slate-400 group-hover:text-orange-500 mb-8 transition-all duration-500 transform group-hover:scale-110 leading-none text-slate-400">{role.icon}</div>
              <h3 className="text-3xl font-black uppercase tracking-tight relative z-10 leading-none text-slate-900 text-center text-slate-950 text-slate-950">{role.label}</h3>
              <span className="text-base font-black text-slate-700 uppercase mt-4 tracking-[0.2em] relative z-10 leading-none text-center text-slate-700 text-slate-700">{role.desc}</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          ))}
        </div>
      </div>
      <Footer onAdminClick={() => setStep('admin-auth')} />
    </div>
  );

  if (step === 'survey') {
    const progress = calculateProgress();
    const questions = SURVEY_DATA[currentRole] || [];
    return (
      <div className="min-h-screen bg-[#F1F5F9] font-['Nunito'] flex flex-col text-slate-900">
        <div className="bg-white sticky top-0 z-50 p-6 border-b-2 border-slate-300 flex flex-col items-center shadow-lg text-slate-900 leading-none">
          <div className="max-w-[1200px] w-full flex justify-between items-center mb-4 leading-none text-slate-900 text-left">
            <button onClick={resetSurvey} className="text-lg font-black flex items-center uppercase tracking-widest hover:text-orange-600 transition-colors leading-none"><ChevronLeft size={24} className="mr-2 leading-none" /> На головну</button>
            <div className="flex items-center gap-6 text-orange-600 font-black leading-none text-orange-600 text-left"><span className="text-lg uppercase leading-none">{progress}% Готово</span><div className="w-64 h-5 bg-slate-300 rounded-full overflow-hidden shadow-inner border-2 border-slate-400 leading-none text-left"><div className="h-full bg-orange-500 transition-all duration-700 ease-out text-left" style={{ width: `${progress}%` }}></div></div></div>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto px-8 mt-16 font-bold mb-20 flex-grow text-slate-900 text-left">
          <div className="mb-16 border-l-[12px] border-orange-500 pl-8 flex justify-between items-end text-slate-900 text-left text-slate-900 text-left text-slate-900 text-left">
            <div className="text-slate-900 text-left">
              <h2 className="text-3xl md:text-[3.5rem] font-black uppercase tracking-tighter leading-[0.85] text-slate-950 text-left text-slate-950">{currentRole === 'applicant' ? 'Абітурієнт 2026' : currentRole === 'parent' ? 'Думка Батьків' : 'Освітяни'}</h2>
              <p className="text-xl mt-4 uppercase tracking-[0.2em] font-black leading-none text-slate-800 text-left">Профіль: Дніпро</p>
            </div>
            <img src={LOGO_URL} alt="Logo" className="h-28 opacity-40 grayscale hidden lg:block text-slate-900" />
          </div>
          <form onSubmit={handleFinish} className="space-y-10 text-slate-900 font-black text-slate-900 text-left">
            {questions.map((q, idx) => (
              <div key={q.key} className={`bg-white p-10 rounded-[3.5rem] shadow-xl border-2 transition-all duration-700 text-left ${formData[q.key] !== undefined || q.type === 'slider' ? 'border-orange-400' : 'border-slate-200 opacity-95'}`}>
                <div className="flex items-start gap-6 mb-8 text-slate-900 text-left leading-none text-left text-slate-900 text-left">
                  <span className="w-12 h-12 bg-slate-100 rounded-[0.8rem] flex items-center justify-center font-black text-xl shrink-0 border-2 border-slate-400 shadow-sm leading-none text-slate-950 text-center">{idx + 1}</span>
                  <p className="text-3xl font-black leading-[1.1] tracking-tight text-slate-950 text-left">{q.q}</p>
                </div>
                {q.type === 'school' && (
                  <div className="space-y-4 text-slate-900 text-left text-slate-950 text-left">
                    <select className="w-full p-6 bg-slate-50 border-2 border-slate-300 rounded-[1.5rem] outline-none focus:border-orange-500 focus:bg-white font-black text-2xl text-slate-950 shadow-inner text-slate-900 leading-none text-slate-950 text-left" value={SCHOOLS_LIST.includes(formData[q.key]) ? formData[q.key] : (formData[q.key] ? "інший" : "")} onChange={(e) => { const val = e.target.value; if (val === "інший") handleInputChange(q.key, ""); else handleInputChange(q.key, val); }}>
                      <option value="" disabled>Оберіть заклад освіти...</option>
                      {SCHOOLS_LIST.map(school => <option key={school} value={school}>{school}</option>)}
                      <option value="інший">Інший заклад (вписати вручну)</option>
                    </select>
                    {(!SCHOOLS_LIST.includes(formData[q.key]) || formData[q.key] === "") && (<input type="text" placeholder="Введіть назву закладу освіти" className="w-full p-6 bg-slate-50 border-2 border-orange-300 rounded-[1.5rem] outline-none focus:border-orange-500 focus:bg-white font-black text-2xl shadow-inner text-slate-950 leading-none text-slate-950 text-left" value={formData[q.key] || ""} onChange={(e) => handleInputChange(q.key, e.target.value)} />)}
                  </div>
                )}
                {q.type === 'choice' && <div className="grid gap-3 text-slate-900 text-left leading-tight text-slate-900 text-left">{q.o.map(opt => (<label key={opt} className={`flex items-center gap-4 p-6 border-2 rounded-[1.5rem] cursor-pointer transition-all text-left ${formData[q.key] === opt ? 'border-orange-500 bg-orange-50 shadow-lg text-slate-950 text-slate-950 text-left' : 'border-slate-200 hover:bg-slate-50 text-slate-900 text-slate-900 text-left'}`}><input type="radio" name={q.key} value={opt} required checked={formData[q.key] === opt} onChange={() => handleInputChange(q.key, opt)} className="w-7 h-7 accent-orange-600 shrink-0 text-slate-900 leading-none text-left" /><span className="text-2xl font-black text-slate-950 text-left leading-tight text-slate-950 text-left">{opt}</span></label>))}</div>}
                {q.type === 'boolean' && <div className="flex gap-4 leading-none text-slate-900 leading-none text-slate-900 text-left">{['Так', 'Ні'].map(v => (<label key={v} className="flex-1 cursor-pointer leading-none text-slate-900 text-slate-900 text-left"><input type="radio" name={q.key} value={v} required checked={formData[q.key] === v} onChange={() => handleInputChange(q.key, v)} className="hidden peer text-slate-900 text-slate-900 text-left" /><div className="text-center py-8 border-2 border-slate-300 bg-slate-50 rounded-[2rem] font-black text-3xl text-slate-900 peer-checked:border-orange-500 peer-checked:bg-orange-100 peer-checked:text-orange-900 transition-all shadow-md leading-none uppercase text-slate-950 text-center text-slate-950 text-center">{v}</div></label>))}</div>}
                {q.type === 'slider' && (
                  <div className="pt-6 leading-none text-slate-900 text-left text-slate-950 text-left text-left">
                    <div className="flex justify-between text-lg font-black uppercase tracking-[0.25em] mb-8 text-slate-900 leading-none text-slate-900 text-left"><span>{q.l?.split(';')[0] || 'Низько'}</span><span>{q.l?.split(';')[1] || 'Високо'}</span></div>
                    <div className="flex items-center gap-10 leading-none text-slate-900 text-slate-900 text-left">
                      <div className="flex-grow relative flex items-center leading-none text-slate-900 text-left">
                        <input type="range" min="1" max="5" step="1" value={formData[q.key] || 3} onChange={e => handleInputChange(q.key, e.target.value)} 
                          className="w-full h-1 bg-slate-300 rounded-full appearance-none cursor-pointer accent-orange-600 shadow-inner border border-slate-300
                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-16 [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:bg-orange-600 [&::-webkit-slider-thumb]:rounded-[1rem] [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-2xl [&::-webkit-slider-thumb]:cursor-pointer text-left text-slate-950 text-left" />
                      </div>
                      <div className="w-24 h-24 bg-orange-600 text-white rounded-[2rem] flex items-center justify-center font-black text-[3.5rem] shadow-2xl border-[6px] border-white shrink-0 transform rotate-6 leading-none text-white text-center text-white text-center">{formData[q.key] || 3}</div>
                    </div>
                  </div>
                )}
                {q.type === 'text' && <textarea required value={formData[q.key] || ""} placeholder="Твоя відповідь..." className="w-full p-6 bg-slate-50 border-2 border-slate-400 rounded-[2rem] outline-none focus:border-orange-500 focus:bg-white font-black text-2xl transition-all min-h-[150px] shadow-inner placeholder:text-slate-500 text-slate-950 leading-tight text-slate-900 text-left font-black text-slate-950 text-left" onChange={e => handleInputChange(q.key, e.target.value)} />}
              </div>
            ))}
            <div className="pt-16 font-black tracking-tighter leading-none text-slate-900 text-white text-center">
                <button disabled={isSubmitting || progress < 100} type="submit" className="w-full py-8 bg-orange-500 text-white rounded-[2.5rem] font-black uppercase text-3xl shadow-xl hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-8 text-white leading-none text-center">
                    {isSubmitting ? <RefreshCw className="animate-spin w-12 h-12 leading-none text-white" /> : <><Send size={32} className="leading-none text-white" /> Надіслати анкету</>}
                </button>
            </div>
          </form>
        </div>
        <Footer onAdminClick={() => setStep('admin-auth')} />
      </div>
    );
  }

  if (step === 'admin-auth') return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 font-['Nunito'] text-slate-900 text-center leading-none text-slate-900 text-center text-slate-900 text-slate-900 text-center">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl text-slate-900 text-center text-slate-900 text-slate-900 text-center">
        <div className="flex justify-center mb-10 text-orange-500 leading-none text-orange-500 text-center">{isAdminLoading ? <Loader2 size={60} className="animate-spin leading-none text-orange-500 text-orange-500 text-center" /> : <Lock size={60} className="leading-none text-orange-500 text-orange-500 text-center" />}</div>
        <h2 className="text-3xl font-black text-center uppercase mb-8 text-slate-900 leading-none text-slate-900 text-center text-slate-900 text-center">Адмін-доступ</h2>
        <form onSubmit={handleAdminLogin} className="space-y-6 text-slate-900 font-black text-slate-900 text-left text-slate-900 text-left">
          <input required type="text" placeholder="Логін" className="w-full p-5 bg-slate-50 border-2 border-slate-200 rounded-[1.5rem] outline-none focus:border-orange-500 font-black text-slate-900 leading-none shadow-sm text-slate-900 text-left font-black text-slate-900 text-left" onChange={e => setAdminAuth({...adminAuth, login: e.target.value})} />
          <input required type="password" placeholder="Пароль" className="w-full p-5 bg-slate-50 border-2 border-slate-200 rounded-[1.5rem] outline-none focus:border-orange-500 font-black text-slate-900 leading-none shadow-sm text-slate-900 text-left font-black text-slate-900 text-left" onChange={e => setAdminAuth({...adminAuth, pass: e.target.value})} />
          {errorMsg && <p className="text-red-500 font-bold text-center leading-none text-red-500 text-center text-red-500 text-center">{errorMsg}</p>}
          <button disabled={isAdminLoading} type="submit" className="w-full py-6 bg-orange-500 text-white rounded-[1.5rem] font-black uppercase shadow-lg hover:bg-orange-600 active:scale-95 transition-all text-white leading-none text-white text-center text-white text-center">Увійти</button>
          <button type="button" onClick={() => setStep('gate')} className="w-full py-4 text-slate-400 font-bold uppercase text-sm leading-none text-slate-400 text-center text-slate-400 text-center">Скасувати</button>
        </form>
      </div>
    </div>
  );

  if (step === 'success') return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-12 text-center text-white font-['Nunito'] relative overflow-hidden text-white leading-none text-center text-white text-center text-white text-center">
      <div className="absolute top-0 right-0 p-32 opacity-10 transform rotate-12 scale-[5] text-white leading-none text-white text-white text-center text-white text-center"><img src={LOGO_URL} alt="Logo" className="w-[1000px] leading-none text-white text-white text-center text-white text-center" /></div>
      <div className="max-w-[1400px] animate-in zoom-in duration-1000 relative z-10 px-12 flex-grow flex flex-col justify-center items-center text-white text-center leading-none text-white text-center text-white text-center">
        <div className="w-48 h-48 bg-green-500/20 rounded-[3rem] flex items-center justify-center mx-auto mb-12 border-4 border-green-500/40 shadow-[0_0_150px_rgba(34,197,94,0.5)] leading-none text-green-500 text-center text-green-500 text-center text-green-500 text-center text-white text-center"><CheckCircle size={100} className="text-green-500 leading-none text-green-500 text-center text-green-500 text-center text-green-500 text-center text-white text-center" /></div>
        <h2 className="text-[4rem] md:text-[6rem] font-black mb-12 uppercase tracking-tighter text-orange-500 leading-[0.8] text-orange-500 text-center leading-none text-orange-500 text-center text-orange-500 text-center text-white text-center">Дякуємо!</h2>
        <p className="text-slate-100 text-2xl md:text-[3rem] font-black mb-32 leading-tight tracking-tight px-12 leading-relaxed text-center leading-relaxed text-white text-center text-white text-center">Ваш голос зафіксовано. Побудуємо майбутнє разом!</p>
        <button onClick={() => window.location.reload()} className="px-32 py-10 bg-white text-slate-950 rounded-full font-black uppercase text-3xl tracking-widest shadow-2xl hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110 active:scale-90 tracking-tighter text-slate-950 leading-none text-center text-slate-950 text-center">На головну</button>
      </div>
      <Footer onAdminClick={() => setStep('admin-auth')} />
    </div>
  );

  return null;
}