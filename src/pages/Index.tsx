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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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

  // Group products by category
  const productsByCategory = products.reduce((acc: any, product: any) => {
    const category = product.category_name || 'Другое';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  // Sort products within each category by price
  Object.keys(productsByCategory).forEach(category => {
    productsByCategory[category].sort((a: any, b: any) => {
      if (!a.price) return 1;
      if (!b.price) return -1;
      return a.price - b.price;
    });
  });

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

                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
                    />
                    <Label htmlFor="consent" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                      Я согласен на обработку персональных данных в соответствии с политикой конфиденциальности
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="packages" className="py-16 md:py-24 bg-gradient-to-br from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Типы пакетов</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Наше оборудование работает с любыми типами пакетов и видами пленок
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Пакет «подушка»', image: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/07950130-d534-4336-993b-1d36c5fce56f.jpg', desc: 'Универсальный тип упаковки для сыпучих продуктов' },
              { title: 'Пакет с боковыми фальцами', image: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/e7e8231a-494b-490f-8853-49e443a38ea2.jpg', desc: 'Увеличенный объем при компактных размерах' },
              { title: 'Пакет-брикет', image: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/66d12319-99ac-4252-b52c-68838c233955.jpg', desc: 'Прямоугольная форма для удобного хранения' },
              { title: 'Саше (3/4-шов)', image: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/81608fce-ab16-4109-9101-15c0dbc33113.jpg', desc: 'Порционная упаковка для разовой дозировки' },
              { title: 'Стик (многорядный)', image: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/471ddd1b-0f2a-45b0-9b61-e53ada444474.jpg', desc: 'Компактная упаковка для жидких и сыпучих продуктов' },
              { title: 'Дой-пак', image: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/e3c8852c-6e59-426c-9b96-f9d03f1976ae.jpg', desc: 'Пакет с устойчивым дном и зип-локом' },
            ].map((pkg, idx) => (
              <Card key={idx} className="overflow-hidden hover-scale">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <CardDescription>{pkg.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="dosators" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Виды дозаторов</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Выберите подходящий тип дозатора в зависимости от специфики вашего продукта
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Scale', title: 'Мультиголовочный весовой', desc: 'Для сыпучих продуктов неоднородной формы: орехи, сухофрукты, снеки', accuracy: '±0.5-1%' },
              { icon: 'CircleDot', title: 'Объемный (шнековый)', desc: 'Для порошкообразных продуктов: мука, специи, сухое молоко', accuracy: '±1-2%' },
              { icon: 'Droplet', title: 'Дозатор жидкости', desc: 'Для жидких и вязких продуктов: соусы, масло, мед, паста', accuracy: '±0.5%' },
              { icon: 'Maximize2', title: 'Линейный весовой', desc: 'Для крупных фракций: макароны, крупы, гранулы', accuracy: '±1%' },
            ].map((dosator, idx) => (
              <Card key={idx} className="hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon name={dosator.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{dosator.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{dosator.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Точность {dosator.accuracy}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-24 bg-gradient-to-br from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Модельный ряд оборудования</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Полный каталог фасовочного оборудования для любых задач
            </p>
          </div>

          {productsLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Загрузка каталога...</p>
            </div>
          ) : Object.keys(productsByCategory).length > 0 ? (
            <Tabs defaultValue={Object.keys(productsByCategory)[0]} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                {Object.keys(productsByCategory).map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.keys(productsByCategory).map(category => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productsByCategory[category].map((product: any) => (
                      <Card key={product.id} className="overflow-hidden hover-scale">
                        {product.image && (
                          <div className="aspect-[4/3] overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          {product.description && (
                            <CardDescription>{product.description}</CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {product.price && (
                            <div className="text-2xl font-bold text-accent">
                              {product.price.toLocaleString('ru-RU')} ₽
                            </div>
                          )}
                          <Button 
                            className="w-full bg-accent hover:bg-accent/90"
                            onClick={openCalculator}
                          >
                            Получить расчет
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Каталог временно недоступен</p>
            </div>
          )}
        </div>
      </section>

      <section id="performance" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Характеристики оборудования</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Высокая производительность и точность фасовки для вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '60', unit: 'пак/мин', label: 'Производительность' },
              { value: '±1', unit: '%', label: 'Точность фасовки' },
              { value: '24/7', unit: '', label: 'Режим работы' },
              { value: '2', unit: 'года', label: 'Гарантия' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg hover-scale">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}<span className="text-2xl">{stat.unit}</span>
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="options" className="py-16 md:py-24 bg-gradient-to-br from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Дополнительные опции</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Расширьте возможности оборудования для решения специфических задач
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'Wind', title: 'MAP система', desc: 'Модифицированная газовая среда для увеличения срока хранения продукции' },
              { icon: 'Waves', title: 'Вакуумирование', desc: 'Удаление воздуха из упаковки для максимальной свежести продукта' },
              { icon: 'Fingerprint', title: 'Датчик печати', desc: 'Позиционирование упаковки для точной печати и нарезки' },
              { icon: 'Calendar', title: 'Датер', desc: 'Автоматическая печать даты производства и срока годности' },
              { icon: 'Zap', title: 'Ионизатор', desc: 'Снятие статического электричества с пленки' },
              { icon: 'Layers', title: 'Мультилинк', desc: 'Объединение нескольких упаковок в одну пачку' },
            ].map((option, idx) => (
              <Card key={idx} className="hover-scale">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon name={option.icon} className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{option.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="service" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Сервис и поддержка</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Полный цикл обслуживания от консультации до постгарантийного сервиса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: 'Phone', title: 'Консультация', desc: 'Помощь в подборе оборудования под ваш продукт и требования' },
              { icon: 'MapPin', title: 'Демозал', desc: 'Бесплатное тестирование вашего продукта на оборудовании' },
              { icon: 'Truck', title: 'Доставка и монтаж', desc: 'Доставка, установка и настройка оборудования под ключ' },
              { icon: 'GraduationCap', title: 'Обучение персонала', desc: 'Подробное обучение работе с оборудованием на вашем производстве' },
              { icon: 'Wrench', title: 'Гарантийный сервис', desc: 'Бесплатное обслуживание в течение всего гарантийного срока' },
              { icon: 'Headphones', title: 'Техподдержка 24/7', desc: 'Круглосуточная консультация по телефону и удаленное подключение' },
            ].map((service, idx) => (
              <Card key={idx} className="hover-scale">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon} className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="leading-relaxed">{service.desc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24 bg-gradient-to-br from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Часто задаваемые вопросы</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ответы на популярные вопросы о нашем оборудовании
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  Какая производительность у ваших автоматов?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Производительность варьируется от 20 до 60 пакетов в минуту в зависимости от модели и типа продукта. Точные характеристики подбираются под ваши задачи.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  Можно ли протестировать оборудование перед покупкой?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Да, мы предоставляем бесплатное тестирование вашего продукта в демонстрационном зале. Запишитесь на удобное время через форму на сайте.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  Какие типы пленок поддерживает оборудование?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Наше оборудование работает с любыми типами пленок: BOPP, PE, PP, ламинированными материалами, барьерными пленками и даже бумагой.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  Какой срок поставки оборудования?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Стандартные модели доступны со склада в России. Срок поставки оборудования под заказ составляет от 30 до 60 дней в зависимости от комплектации.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  Предоставляете ли вы обучение персонала?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Да, обучение входит в стоимость оборудования. Наш специалист проведет полное обучение вашего персонала на вашем производстве.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-left font-semibold">
                  Какая гарантия на оборудование?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Стандартная гарантия составляет 12 месяцев. Также доступна расширенная гарантия до 24 месяцев. В течение всего гарантийного срока обслуживание бесплатное.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="https://cdn.poehali.dev/files/fec45e66-45c2-4c6a-8b0f-74188df1e0db.png" alt="Техно-Сиб" className="h-12 mb-4 brightness-0 invert" />
              <p className="text-sm text-gray-300 leading-relaxed">
                Официальный поставщик фасовочного оборудования в России. Полный цикл: от консультации до постгарантийного обслуживания.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" className="w-4 h-4" />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" className="w-4 h-4" />
                  <span>info@tehno-sib.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" className="w-4 h-4" />
                  <span>г. Москва, ул. Примерная, д. 1</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <nav className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <a href="#packages" className="hover:text-white transition-colors">Пакеты</a>
                <a href="#dosators" className="hover:text-white transition-colors">Дозаторы</a>
                <a href="#products" className="hover:text-white transition-colors">Оборудование</a>
                <a href="#options" className="hover:text-white transition-colors">Опции</a>
                <a href="#service" className="hover:text-white transition-colors">Сервис</a>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </nav>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Техно-Сиб. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Получить расчет стоимости</DialogTitle>
            <DialogDescription>
              Заполните форму и мы рассчитаем стоимость оборудования для вашего продукта
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

            <div className="flex items-start gap-2">
              <Checkbox 
                id="modal-consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
              />
              <Label htmlFor="modal-consent" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                Я согласен на обработку персональных данных
              </Label>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDemoModal} onOpenChange={setIsDemoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Записаться в демозал</DialogTitle>
            <DialogDescription>
              Протестируйте оборудование с вашим продуктом бесплатно
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

            <div className="flex items-start gap-2">
              <Checkbox 
                id="demo-consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
              />
              <Label htmlFor="demo-consent" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                Я согласен на обработку персональных данных
              </Label>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
