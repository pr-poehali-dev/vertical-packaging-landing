import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [isDemoModal, setIsDemoModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    product: '',
    phone: '',
    email: '',
    consent: false,
  });

  useEffect(() => {
    fetch('https://functions.poehali.dev/34361303-61c7-4356-b406-4f845bd5065b')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || [])
        setProductsLoading(false)
      })
      .catch(() => setProductsLoading(false))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Заполните обязательные поля: Имя и Телефон');
      return;
    }
    toast.success('Заявка отправлена! Мы свяжемся с вами в течение 15 минут.');
    setShowModal(false);
    setIsDemoModal(false);
  };

  const openCalculator = () => {
    setIsDemoModal(false);
    setShowModal(true);
  };

  const openDemo = () => {
    setShowModal(false);
    setIsDemoModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                  <a href="#packages" className="text-lg font-medium hover:text-primary transition-colors">Пакеты</a>
                  <a href="#dosators" className="text-lg font-medium hover:text-primary transition-colors">Дозаторы</a>
                  <a href="#products" className="text-lg font-medium hover:text-primary transition-colors">Оборудование</a>
                  <a href="#options" className="text-lg font-medium hover:text-primary transition-colors">Опции</a>
                  <a href="#service" className="text-lg font-medium hover:text-primary transition-colors">Сервис</a>
                  <a href="#faq" className="text-lg font-medium hover:text-primary transition-colors">FAQ</a>
                  <Button className="bg-accent hover:bg-accent/90 mt-4" onClick={openCalculator}>Получить расчет</Button>
                </nav>
              </SheetContent>
            </Sheet>
            <img src="https://cdn.poehali.dev/files/fec45e66-45c2-4c6a-8b0f-74188df1e0db.png" alt="ПакТех" className="h-12" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#packages" className="text-sm font-medium hover:text-primary transition-colors">Пакеты</a>
            <a href="#dosators" className="text-sm font-medium hover:text-primary transition-colors">Дозаторы</a>
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">Оборудование</a>
            <a href="#options" className="text-sm font-medium hover:text-primary transition-colors">Опции</a>
            <a href="#service" className="text-sm font-medium hover:text-primary transition-colors">Сервис</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>Получить расчет</Button>
          </nav>
        </div>
      </header>

      <section id="hero" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Вертикальные фасовочные автоматы под ваш продукт
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Производительность до 60 пак/мин. Точность фасовки до 1%. Надежная запайка швов и работа с BOPP, барьерными пленками и ламинированной бумагой. Бесплатный запуск и тест в демозале
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: 'Gauge', text: 'До 60 пак/мин' },
                  { icon: 'Settings', text: 'Автонастройка' },
                  { icon: 'Wind', text: 'MAP/вакуум' },
                  { icon: 'Award', text: 'CE, ISO 9001' },
                  { icon: 'ShieldCheck', text: 'Гарантия до 2х лет' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-border hover-scale">
                    <Icon name={item.icon} className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>
                  <Icon name="Calculator" className="w-5 h-5 mr-2" />
                  Получить расчет
                </Button>
                <Button size="lg" variant="outline" onClick={openDemo}>
                  <Icon name="Calendar" className="w-5 h-5 mr-2" />
                  Записаться в демозал
                </Button>
              </div>
            </div>

            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle>Получить расчет</CardTitle>
                <CardDescription>Заполните форму и получите точный расчет стоимости</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя <span className="text-red-500">*</span></Label>
                    <Input 
                      id="name" 
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="product">Продукт</Label>
                    <Input 
                      id="product" 
                      placeholder="Например: орехи, крупы, специи"
                      value={formData.product}
                      onChange={(e) => setFormData({...formData, product: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон <span className="text-red-500">*</span></Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+7 (999) 123-45-67"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="mail@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="consent" 
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
                    />
                    <label htmlFor="consent" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                      Согласен на обработку персональных данных
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                    Получить расчет
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="packages" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Любой тип пакета под задачу вашего продукта
            </h2>
            <p className="text-lg text-muted-foreground">
              Настраиваем формирующие комплекты и швы под ваши требования
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Пакет «подушка»', desc: 'Классический формат для снеков, чипсов, конфет', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/07950130-d534-4336-993b-1d36c5fce56f.jpg' },
              { name: 'Пакет с боковыми фальцами', desc: 'Увеличенный объем для кофе, круп', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/5ac7e38f-e4cd-410f-88eb-2a6e77e3a2e4.jpg' },
              { name: 'Пакет с дном Stabilo', desc: 'Устойчивое дно для орехов, сухофруктов', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/2f80b50c-e6a5-4b59-b35b-c6ec72cb16e6.jpg' },
              { name: 'Пакет Doy-Pack', desc: 'Премиум упаковка для кофе, чая, специй', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/3e17bbc5-c8e8-47c5-87c5-d3b0c2f8a074.jpg' },
              { name: 'Пакет Квадро', desc: 'Четыре шва, максимальная герметичность', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/dc5595da-09da-4c62-aeeb-c7010ac2e959.jpg' },
              { name: 'Саше', desc: 'Порционная фасовка для разового использования', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/2b9cfe84-80f6-4f4e-9bd1-2a6e88d3cf4b.jpg' },
            ].map((pkg, idx) => (
              <Card key={idx} className="hover-scale overflow-hidden">
                <img src={pkg.img} alt={pkg.name} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="equipment" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Модельный ряд оборудования
            </h2>
            <p className="text-lg text-muted-foreground">
              От малых производств до промышленных линий
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { model: 'Мини', speed: 'До 30 пак/мин', weight: '5-500 г', price: 'от 850 000 ₽', features: ['Компактный размер', 'Простое управление', 'Быстрая окупаемость'] },
              { model: 'Стандарт', speed: 'До 45 пак/мин', weight: '10-1000 г', price: 'от 1 250 000 ₽', features: ['Сенсорное управление', 'Модульная конструкция', 'Расширенные опции'], popular: true },
              { model: 'Премиум', speed: 'До 60 пак/мин', weight: '10-2000 г', price: 'от 1 850 000 ₽', features: ['Макс производительность', 'Интеграция с ERP', 'Приоритетная поддержка'] },
            ].map((eq, idx) => (
              <Card key={idx} className={`hover-scale ${eq.popular ? 'border-accent border-2 shadow-lg' : ''}`}>
                {eq.popular && (
                  <div className="bg-accent text-white text-center py-2 font-semibold text-sm">
                    Популярный выбор
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{eq.model}</CardTitle>
                  <CardDescription className="text-xl font-bold text-accent">{eq.price}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name="Gauge" className="w-5 h-5 text-muted-foreground" />
                      <span>{eq.speed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Weight" className="w-5 h-5 text-muted-foreground" />
                      <span>{eq.weight}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <ul className="space-y-2">
                      {eq.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Icon name="Check" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90" onClick={openCalculator}>Получить расчет</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="options" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Дополнительные опции и модули
            </h2>
            <p className="text-lg text-muted-foreground">
              Расширьте возможности вашего автомата
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Printer', name: 'Термопринтер', desc: 'Дата, партия, срок годности' },
              { icon: 'Tag', name: 'Этикетировщик', desc: 'Автоматическая наклейка этикеток' },
              { icon: 'Wind', name: 'Газонаполнение', desc: 'MAP для увеличения срока хранения' },
              { icon: 'QrCode', name: 'Контроллер веса', desc: 'Автоматический контроль массы' },
              { icon: 'Cpu', name: 'Мультиголовка', desc: 'Дозирование несыпучих продуктов' },
              { icon: 'CircuitBoard', name: 'PLC Siemens', desc: 'Промышленный контроллер' },
              { icon: 'Zap', name: 'Авто-подача', desc: 'Элеватор для сыпучих продуктов' },
              { icon: 'Package', name: 'Транспортер', desc: 'Отвод готовых пакетов' },
            ].map((opt, idx) => (
              <Card key={idx} className="hover-scale text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Icon name={opt.icon} className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{opt.name}</CardTitle>
                  <CardDescription>{opt.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Прозрачные условия работы
            </h2>
            <p className="text-lg text-muted-foreground">
              Выберите удобный способ приобретения
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Покупка', icon: 'ShoppingCart', features: ['Полное владение', 'Гарантия 1-2 года', 'Техподдержка 24/7', 'Обучение персонала'], highlight: false },
              { title: 'Лизинг', icon: 'TrendingUp', features: ['От 10% первый взнос', 'Срок до 5 лет', 'Ставка от 4.5%', 'Сниженная нагрузка'], highlight: true },
              { title: 'Аренда', icon: 'Calendar', features: ['От 3 месяцев', 'Без первого взноса', 'Тест перед покупкой', 'Гибкие условия'], highlight: false },
            ].map((plan, idx) => (
              <Card key={idx} className={`hover-scale ${plan.highlight ? 'border-accent border-2 shadow-lg' : ''}`}>
                {plan.highlight && (
                  <div className="bg-accent text-white text-center py-2 font-semibold text-sm">
                    Выгодно
                  </div>
                )}
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Icon name={plan.icon} className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl text-center">{plan.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-accent hover:bg-accent/90" onClick={openCalculator}>
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Наше оборудование
            </h2>
            <p className="text-lg text-muted-foreground">
              Профессиональное фасовочное оборудование от проверенных производителей
            </p>
          </div>

          {productsLoading ? (
            <div className="text-center text-lg text-muted-foreground">
              Загрузка товаров...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center text-lg text-muted-foreground">
              Товары скоро появятся
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any, idx: number) => (
                <Card key={idx} className="hover-scale overflow-hidden">
                  {product.picture && (
                    <img src={product.picture} alt={product.name} className="w-full h-48 object-cover" />
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    {product.price && (
                      <CardDescription className="text-xl font-bold text-accent">
                        {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {product.url && (
                      <Button 
                        className="w-full bg-accent hover:bg-accent/90" 
                        onClick={() => window.open(product.url, '_blank')}
                      >
                        Подробнее
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Частые вопросы
            </h2>
            <p className="text-lg text-muted-foreground">
              Ответы на популярные вопросы о нашем оборудовании
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: 'Какой срок поставки оборудования?', a: 'Стандартный срок поставки 30-45 дней с момента оплаты. Для срочных заказов возможна ускоренная поставка за 14-21 день.' },
                { q: 'Нужно ли обучение персонала?', a: 'Да, мы проводим обучение ваших сотрудников работе с оборудованием. Обучение включено в стоимость и занимает 1-2 дня.' },
                { q: 'Какая гарантия на оборудование?', a: 'Стандартная гарантия 12 месяцев. Возможно продление до 24 месяцев. Гарантия покрывает все узлы и детали.' },
                { q: 'Можно ли протестировать автомат?', a: 'Да, у нас есть демозал в Москве, где вы можете протестировать любую модель с вашим продуктом абсолютно бесплатно.' },
                { q: 'Какие расходники нужны для работы?', a: 'Основной расходник - это упаковочная пленка. Расход зависит от размера пакета. Дополнительно могут потребоваться термолента для принтера и этикетки.' },
                { q: 'Есть ли сервисное обслуживание?', a: 'Да, мы предоставляем полное сервисное обслуживание. Техподдержка 24/7, выезд инженера в течение 24 часов, наличие запчастей на складе.' },
              ].map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6 bg-white shadow-sm">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="service" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Сервис и поддержка
            </h2>
            <p className="text-lg text-muted-foreground">
              Мы с вами на всех этапах работы
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Headphones', title: 'Техподдержка 24/7', desc: 'Всегда на связи по телефону и в мессенджерах' },
              { icon: 'Wrench', title: 'Выезд инженера', desc: 'В течение 24 часов по Москве и МО' },
              { icon: 'Package', title: 'Склад запчастей', desc: 'Все необходимые детали всегда в наличии' },
              { icon: 'GraduationCap', title: 'Обучение', desc: 'Обучим ваш персонал работе с автоматом' },
            ].map((srv, idx) => (
              <Card key={idx} className="hover-scale text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Icon name={srv.icon} className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{srv.title}</CardTitle>
                  <CardDescription>{srv.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы начать?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Получите индивидуальный расчет стоимости или запишитесь на бесплатное тестирование в нашем демозале
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={openCalculator}>
              <Icon name="Calculator" className="w-5 h-5 mr-2" />
              Получить расчет
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" onClick={openDemo}>
              <Icon name="Calendar" className="w-5 h-5 mr-2" />
              Записаться в демозал
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="https://cdn.poehali.dev/files/fec45e66-45c2-4c6a-8b0f-74188df1e0db.png" alt="ПакТех" className="h-12 mb-4 brightness-0 invert" />
              <p className="text-sm text-white/70">
                Профессиональное фасовочное оборудование для вашего бизнеса
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#equipment" className="text-white/70 hover:text-white transition-colors">Оборудование</a></li>
                <li><a href="#packages" className="text-white/70 hover:text-white transition-colors">Пакеты</a></li>
                <li><a href="#options" className="text-white/70 hover:text-white transition-colors">Опции</a></li>
                <li><a href="#service" className="text-white/70 hover:text-white transition-colors">Сервис</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="w-4 h-4" />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="w-4 h-4" />
                  info@paktech.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-4 h-4" />
                  Москва, ул. Примерная, 123
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Режим работы</h3>
              <p className="text-sm text-white/70">
                Пн-Пт: 9:00 - 18:00<br />
                Сб-Вс: Выходной<br />
                Техподдержка: 24/7
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
            © 2024 ПакТех. Все права защищены.
          </div>
        </div>
      </footer>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Получить расчет</DialogTitle>
            <DialogDescription>
              Заполните форму и мы рассчитаем стоимость под ваши задачи
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="modal-name">Имя <span className="text-red-500">*</span></Label>
              <Input 
                id="modal-name" 
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="modal-product">Продукт</Label>
              <Input 
                id="modal-product" 
                placeholder="Например: орехи, крупы, специи"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="modal-phone">Телефон <span className="text-red-500">*</span></Label>
              <Input 
                id="modal-phone" 
                type="tel" 
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="modal-email">E-mail</Label>
              <Input 
                id="modal-email" 
                type="email" 
                placeholder="mail@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="modal-consent" 
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
              />
              <label htmlFor="modal-consent" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                Согласен на обработку персональных данных
              </label>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Получить расчет
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDemoModal} onOpenChange={setIsDemoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Записаться в демозал</DialogTitle>
            <DialogDescription>
              Протестируйте оборудование с вашим продуктом абсолютно бесплатно
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="demo-name">Имя <span className="text-red-500">*</span></Label>
              <Input 
                id="demo-name" 
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="demo-product">Продукт</Label>
              <Input 
                id="demo-product" 
                placeholder="Например: орехи, крупы, специи"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="demo-phone">Телефон <span className="text-red-500">*</span></Label>
              <Input 
                id="demo-phone" 
                type="tel" 
                placeholder="+7 (999) 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="demo-email">E-mail</Label>
              <Input 
                id="demo-email" 
                type="email" 
                placeholder="mail@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="demo-consent" 
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
              />
              <label htmlFor="demo-consent" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                Согласен на обработку персональных данных
              </label>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Записаться
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}