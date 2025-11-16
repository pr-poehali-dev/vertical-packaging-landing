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

  // Helper function to extract specific params from product
  const extractProductSpecs = (product: any) => {
    const specs: { label: string; value: string }[] = [];
    
    // Extract specific params from params array
    if (product.params && Array.isArray(product.params)) {
      const specsToExtract = [
        { key: 'Мощность (Вт)', label: 'Мощность' },
        { key: 'Расчетная производительность (пакетов/мин)', label: 'Производительность' },
        { key: 'Диапазон дозирования (мл)', label: 'Диапазон дозирования' }
      ];
      
      specsToExtract.forEach(spec => {
        const param = product.params.find((p: any) => p.name === spec.key);
        if (param && param.value) {
          specs.push({ label: spec.label, value: param.value });
        }
      });
    }
    
    return specs.length > 0 ? specs : null;
  };
  
  // Helper function to get first image from product
  const getProductImage = (product: any) => {
    if (product.params && Array.isArray(product.params)) {
      const picturesParam = product.params.find((p: any) => p.name === 'Картинки товара');
      if (picturesParam && picturesParam.value) {
        // Get first image URL
        const urls = picturesParam.value.split(',').map((url: string) => url.trim());
        return urls[0] || product.picture;
      }
    }
    return product.picture;
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
                  <a href="tel:88005337522" className="text-lg font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-2">
                    <Icon name="Phone" className="w-5 h-5" />
                    8 800 533-75-22
                  </a>
                  <Button className="bg-accent hover:bg-accent/90 mt-4" onClick={openCalculator}>Получить расчет</Button>
                </nav>
              </SheetContent>
            </Sheet>
            <img src="https://cdn.poehali.dev/files/e7ccdbef-3231-40f1-b8df-e1e76e5ed6c3.jpg" alt="Техно-Сиб" className="h-12 object-contain" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#packages" className="text-sm font-medium hover:text-primary transition-colors">Пакеты</a>
            <a href="#dosators" className="text-sm font-medium hover:text-primary transition-colors">Дозаторы</a>
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">Оборудование</a>
            <a href="#options" className="text-sm font-medium hover:text-primary transition-colors">Опции</a>
            <a href="#service" className="text-sm font-medium hover:text-primary transition-colors">Сервис</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <a href="tel:88005337522" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-2">
              <Icon name="Phone" className="w-5 h-5" />
              8 800 533-75-22
            </a>
            <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>Получить расчет</Button>
          </nav>
        </div>
      </header>

      <section id="hero" className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-white to-accent/5">
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
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
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
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                      Я согласен на обработку персональных данных и получение коммерческих предложений
                    </label>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                    Получить расчет
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="packages" className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Типы пакетов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Подходим к работе с любым упаковочным материалом: от эконом-решений до премиальных барьерных пленок
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Pillow (подушка)',
                icon: 'Package',
                description: 'Классический формат для сыпучих продуктов',
                features: ['Быстрая фасовка', 'Экономичное решение', 'Для круп, снеков, специй'],
                image: 'https://cdn.poehali.dev/files/bc3c44ac-7d26-45db-b6ad-e34b2af0a62b.png'
              },
              {
                title: 'Doy-Pack (стой-пак)',
                icon: 'ShoppingBag',
                description: 'Пакеты с плоским дном для премиальных товаров',
                features: ['Устойчивые на полке', 'Зип-лок / клапан дегазации', 'Для кофе, чая, сухофруктов'],
                image: 'https://cdn.poehali.dev/files/75a6d70f-4d7f-421f-bf77-57126ae41d0f.png'
              },
              {
                title: 'Quad Seal (четырехшовный)',
                icon: 'Box',
                description: 'Объемный пакет с боковыми складками',
                features: ['Большой объем', 'Премиальный вид', 'Для крупы, макарон, кормов'],
                image: 'https://cdn.poehali.dev/files/7db9bb67-3f5c-4f64-88a2-eea24dd02c77.png'
              },
            ].map((pkg, idx) => (
              <Card key={idx} className="hover-scale overflow-hidden border-2 hover:border-accent transition-all">
                <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-6">
                  <img src={pkg.image} alt={pkg.title} className="max-h-full max-w-full object-contain" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <Icon name={pkg.icon} className="w-6 h-6 text-accent flex-shrink-0" />
                  </div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="dosators" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Типы дозаторов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Выбор дозирующей системы под ваш продукт: от сыпучих до жидких веществ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Объемный',
                icon: 'Beaker',
                description: 'Для сыпучих и гранулированных продуктов',
                features: ['Крупы, семена', 'Гранулы, снеки', 'Кофе, чай'],
                accuracy: '±1-2%'
              },
              {
                title: 'Весовой',
                icon: 'Scale',
                description: 'Мультиголовочные весы для высокой точности',
                features: ['Орехи, сухофрукты', 'Конфеты, печенье', 'Замороженные продукты'],
                accuracy: '±0.5-1%'
              },
              {
                title: 'Шнековый',
                icon: 'Cylinder',
                description: 'Для порошкообразных продуктов',
                features: ['Мука, специи', 'Сухое молоко', 'Протеиновые смеси'],
                accuracy: '±1-2%'
              },
              {
                title: 'Жидкостный',
                icon: 'Droplet',
                description: 'Поршневой или перистальтический насос',
                features: ['Соусы, кетчупы', 'Масла, мед', 'Жидкие корма'],
                accuracy: '±0.5-1%'
              },
            ].map((dosator, idx) => (
              <Card key={idx} className="hover-scale border-2 hover:border-primary transition-all flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{dosator.title}</CardTitle>
                    <Icon name={dosator.icon} className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                  <CardDescription>{dosator.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-2 flex-grow">
                    {dosator.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Badge variant="secondary" className="w-full justify-center mt-4">
                    Точность: {dosator.accuracy}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Модельный ряд оборудования</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Широкий выбор вертикальных автоматов для различных потребностей и бюджетов
            </p>
          </div>

          {productsLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : Object.keys(productsByCategory).length > 0 ? (
            <Tabs defaultValue={Object.keys(productsByCategory)[0]} className="w-full">
              <div className="mb-8">
                <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 bg-transparent h-auto p-0">
                  {Object.keys(productsByCategory).map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="h-auto min-h-[60px] whitespace-normal text-center bg-white border-2 border-border data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:border-accent px-3 py-2 rounded-lg font-medium transition-all text-sm leading-tight"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {Object.entries(productsByCategory).map(([category, categoryProducts]: [string, any]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProducts.map((product: any) => {
                      const specs = extractProductSpecs(product);
                      const productImage = getProductImage(product);
                      
                      return (
                        <Card key={product.id} className="hover-scale overflow-hidden border-2 hover:border-accent transition-all flex flex-col">
                          {productImage && (
                            <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-6">
                              <img 
                                src={productImage} 
                                alt={product.name} 
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <CardTitle className="text-xl line-clamp-2 min-h-[3.5rem]">{product.name}</CardTitle>
                            {product.price && (
                              <div className="text-2xl font-bold text-accent mt-2">
                                {product.price.toLocaleString('ru-RU')} руб.
                              </div>
                            )}
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col">
                            {specs && specs.length > 0 && (
                              <div className="bg-slate-50 p-4 rounded-lg mb-4 flex-grow">
                                <h4 className="font-semibold mb-3 text-sm">Технические характеристики:</h4>
                                <ul className="space-y-2">
                                  {specs.map((spec, idx) => (
                                    <li key={idx} className="flex items-start text-sm">
                                      <span className="inline-block w-2 h-2 bg-accent rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                      <span><strong>{spec.label}:</strong> {spec.value}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            <Button 
                              className="w-full bg-accent hover:bg-accent/90 mt-auto"
                              onClick={openCalculator}
                            >
                              Оставить заявку
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              Продукты не найдены
            </div>
          )}
        </div>
      </section>

      <section id="options" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Опции под ваш процесс — без лишней сложности
            </h2>
            <p className="text-lg text-muted-foreground">
              Готовые модули интегрируются на этапе поставки
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Газовая среда (MAP)', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/4545914e-a1fd-4fe1-b1f3-3c1146396b94.jpg' },
              { name: 'Откачка воздуха', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/b549a6dd-f916-423d-9840-8e7aefea8ccd.jpg' },
              { name: 'Впрыск спирта', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/ca0677bd-f999-4b3a-846c-009904a64e26.jpg' },
              { name: 'Принтеры маркировки', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/a4105a41-e681-48d3-b38d-4da80549bcbe.jpg' },
              { name: 'Аппликаторы этикетки', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/121f6228-1c4b-4c40-84ab-c8565f3ab708.jpg' },
              { name: 'Перфорация пленки', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/f122190b-eea6-4dcc-91ec-c3f1de9649b8.jpg' },
              { name: 'Чеквейер', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/71a36b21-f65b-4edc-803e-6bda4ac6f02c.jpg' },
              { name: 'Металлоискатель', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/161e0920-2870-420a-b8fc-82586661bf6d.jpg' },
              { name: 'Удаленный доступ', img: 'https://cdn.poehali.dev/projects/354ea260-0f68-4fbc-8160-91683cbe426f/files/6a7cff5b-16c9-4642-86fb-0ee3774e7a28.jpg' },
            ].map((option, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="w-full h-32 rounded-lg overflow-hidden mx-auto mb-3">
                    <img src={option.img} alt={option.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-medium">{option.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>
              Собрать комплектацию и получить смету
            </Button>
          </div>
        </div>
      </section>

      <section id="service" className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Запуск под ключ и поддержка на всей территории России</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Несем ответственность за результат — от подбора до сервисного сопровождения
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Гарантия до 2х лет', icon: 'ShieldCheck' },
              { title: 'Бесплатные ПНР', icon: 'CheckCircle2' },
              { title: 'Доставка по России и СНГ', icon: 'Truck' },
              { title: 'Большой склад запчастей', icon: 'Warehouse' },
              { title: 'Сеть сервисных центров', icon: 'MapPin' },
              { title: 'Проверенные производители', icon: 'Award' },
              { title: 'Работа 24/7', icon: 'Clock' },
              { title: 'CE, ISO 9001', icon: 'Medal' },
            ].map((item, idx) => (
              <Card key={idx} className="hover-scale border-2 hover:border-accent transition-all text-center">
                <CardContent className="pt-6 pb-6">
                  <Icon name={item.icon} className="w-12 h-12 text-accent mx-auto mb-3" />
                  <p className="font-medium text-sm">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={openCalculator}>
              Узнать условия сервиса
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Частые вопросы</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ответы на популярные вопросы о фасовочном оборудовании
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  q: 'Какая производительность у автоматов?',
                  a: 'В зависимости от модели и продукта: от 20 до 60 пакетов в минуту. Для точного расчета необходимо знать вес упаковки, размер пакета и характеристики продукта.'
                },
                {
                  q: 'Какие пленки можно использовать?',
                  a: 'Наши автоматы работают с BOPP (полипропилен), CPP, PE (полиэтилен), ламинированными пленками, барьерными материалами и крафт-бумагой с ламинацией. Толщина пленки: 40-120 мкм.'
                },
                {
                  q: 'Нужен ли специальный персонал для обслуживания?',
                  a: 'Нет, наши автоматы просты в управлении. Базовое обучение оператора занимает 2-3 дня. Мы проводим бесплатное обучение при запуске оборудования. Для сложного ремонта есть служба сервиса.'
                },
                {
                  q: 'Как долго длится гарантия?',
                  a: 'Стандартная гарантия — 12 месяцев. При покупке сервисного пакета можно продлить до 24 месяцев или получить бессрочную гарантию в премиум-пакете.'
                },
                {
                  q: 'Можно ли протестировать оборудование перед покупкой?',
                  a: 'Да! У нас есть демо-зал, где вы можете протестировать любую модель со своим продуктом и пленкой. Запись — по кнопке "Записаться в демозал" или по телефону 8 800 533-75-22.'
                },
                {
                  q: 'Какие сроки поставки оборудования?',
                  a: 'Складские модели — 3-7 дней. Оборудование под заказ с дополнительными опциями — 4-8 недель. Возможна ускоренная поставка за дополнительную плату.'
                },
                {
                  q: 'Есть ли лизинг или рассрочка?',
                  a: 'Да, мы работаем с лизинговыми компаниями. Первый взнос от 10%, срок лизинга до 5 лет. Также доступна рассрочка от производителя на 6-12 месяцев без процентов.'
                },
                {
                  q: 'Что делать, если оборудование сломалось?',
                  a: 'Позвоните на горячую линию 8 800 533-75-22 или напишите в техподдержку. Мы проведем удаленную диагностику, а при необходимости направим инженера в течение 48 часов (по РФ).'
                }
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-2 rounded-lg px-6 bg-white">
                  <AccordionTrigger className="text-left font-semibold hover:text-accent">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Готовы начать?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Получите персональный расчет стоимости или запишитесь на демонстрацию оборудования
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
      </section>

      <footer className="bg-secondary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="https://cdn.poehali.dev/files/e7ccdbef-3231-40f1-b8df-e1e76e5ed6c3.jpg" alt="Техно-Сиб" className="h-12 mb-4 object-contain brightness-0 invert" />
              <p className="text-sm text-slate-300">
                Поставка и сервисное обслуживание фасовочного оборудования
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <nav className="flex flex-col gap-2">
                <a href="#packages" className="text-sm text-slate-300 hover:text-white transition-colors">Пакеты</a>
                <a href="#dosators" className="text-sm text-slate-300 hover:text-white transition-colors">Дозаторы</a>
                <a href="#products" className="text-sm text-slate-300 hover:text-white transition-colors">Оборудование</a>
                <a href="#options" className="text-sm text-slate-300 hover:text-white transition-colors">Опции</a>
                <a href="#service" className="text-sm text-slate-300 hover:text-white transition-colors">Сервис</a>
                <a href="#faq" className="text-sm text-slate-300 hover:text-white transition-colors">FAQ</a>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-3">
                <a href="tel:88005337522" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <Icon name="Phone" className="w-4 h-4" />
                  8 800 533-75-22
                </a>
                <a href="mailto:info@paktech.ru" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <Icon name="Mail" className="w-4 h-4" />
                  info@paktech.ru
                </a>
                <div className="flex items-start gap-2 text-sm text-slate-300">
                  <Icon name="MapPin" className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Москва, ул. Промышленная, 12</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            2024 Техно-Сиб. Все права защищены.
          </div>
        </div>
      </footer>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Получить расчет стоимости</DialogTitle>
            <DialogDescription>
              Заполните форму и наш менеджер свяжется с вами в течение 15 минут
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
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="modal-email">Email</Label>
              <Input 
                id="modal-email" 
                type="email" 
                placeholder="your@email.com"
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
              <label htmlFor="modal-consent" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                Я согласен на обработку персональных данных
              </label>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
              Отправить заявку
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDemoModal} onOpenChange={setIsDemoModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Записаться в демозал</DialogTitle>
            <DialogDescription>
              Протестируйте оборудование со своим продуктом. Бесплатно!
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
              <Label htmlFor="demo-product">Какой продукт будете тестировать?</Label>
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
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="demo-email">Email</Label>
              <Input 
                id="demo-email" 
                type="email" 
                placeholder="your@email.com"
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
              <label htmlFor="demo-consent" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                Я согласен на обработку персональных данных
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