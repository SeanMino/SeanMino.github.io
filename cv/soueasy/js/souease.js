			var keyWord = '';
	        var prepage = 12;
	        var page = 1;
	        var pages = 0;
			$(function() {
				$('.navbar-nav li').on('click',function(){
					$('.navbar-nav li').removeClass('active');
					$(this).addClass('active');
				})
				
				
				$('#searchForm').on('submit', function() {
					document.body.style.background = "#fff";
	               	$('.list').html("");
	               	$('.list1').html("");
	                if($('.navbar-nav li').eq(0).hasClass('active')){
		                keyWord = $('#searchText').val();
		                prepage = 12;
	                	page = 1;
	                	pages = 0;
		                getData();
		                return false;
	                }else if($('.navbar-nav li').eq(1).hasClass('active')){
	                	keyWord = $('#searchText').val();
	                	prepage = 12;
	                	page = 1;
	                	pages = 0;
		                getData1();
		                return false;
	                }
	            })
				
	            
            })
     

        function getData() {
             $.getJSON('https://api.douban.com/v2/book/search?q=' + keyWord +　'&callback=?&start=' + (prepage * (page - 1)) + '&count=' + prepage, function(data) {
                      
				console.log(data)
                pages = Math.ceil( data.total / prepage );

                //渲染结果头部
                $('#resultHead').html(
                    template('templateResultHead', {
                        keyword: keyWord,   //搜索关键字
                        total: data.total,  //搜索的总记录条数
                        prepage: prepage,    //每页显示的条数
                        page: page,		//当前第几页
                        pages: pages   //总页数
                    })
                );

                //渲染结果列表
                $('.list').html(
                    template('templateResultList', {
                        books: data.books
                    })
                )

                //渲染分页
                var pageLimit = getPageLimit(pages, 9, page);
                console.log(pageLimit)
                $('.pagesFooter').html(
                    template('templagePages', {
                        pageLimit: pageLimit,
                        page: page
                    })
                )
                $('.pagesFooter .pageList').on('click', function() {
                	$('.list1').html("");
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    page = parseInt($(this).attr('_page'));
                    getData();
                })
                $('.nextPage').on('click', function() {
                	$('.list1').html("");
                    page = Math.min(++page, pages);
                    getData();
                })
                $('.prevPage').on('click', function() {
                	$('.list1').html("");
//                  page = Math.max(--page, pages);
					page--;
					if(page<1){
						page = 1;
					}
                    getData();
                })

            });
        }
        
         function getData1() {
         	
             $.getJSON('https://api.douban.com/v2/movie/search?q=' + keyWord +　'&callback=?&start=' + (prepage * (page - 1)) + '&count=' + prepage, function(data) {
                      
				console.log(data)
                pages = Math.ceil( data.total / prepage );

                //渲染结果头部
                $('#resultHead').html(
                        template('templateResultHead', {
                            keyword: keyWord,   //搜索关键字
                            total: data.total,  //搜索的总记录条数
                            prepage: prepage,    //每页显示的条数
                            page: page,		//当前第几页
                            pages: pages   //总页数
                        })
                );

                //渲染结果列表
                $('.list1').html(
                    template('templateResultList1', {
                        subjects: data.subjects
                    })
                )

                //渲染分页
                var pageLimit = getPageLimit(pages, 9, page);
                console.log(pageLimit)
                $('.pagesFooter').html(
                        template('templagePages', {
                            pageLimit: pageLimit,
                            page: page
                        })
                )
                $('.pagesFooter .pageList').on('click', function() {
                	$('.list').html("");
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    page = parseInt($(this).attr('_page'));
                    getData1();
                })
                $('.nextPage').on('click', function() {
                	$('.list').html("");
                    page = Math.min(++page, pages);
                    getData1();
                })
                $('.prevPage').on('click', function() {
                	$('.list').html("");
					page--;
					if(page<1){
						page = 1;
					}
                    getData1();
                })

            });
        }

        function getPageLimit(pages, showpages, page) {
            //计算当前页左偏移量
            var offsetLeft = Math.floor( showpages / 2 );
            //根据偏移量计算start
            var start = Math.max(1, page - offsetLeft);
            //根据start和showpages计算出end
            var end = Math.min(pages, start + showpages - 1);
            //根据end和showpages计算start：避免显示的页码数小于要显示的showpages
            start = Math.max(1, end - showpages + 1);
            return {
                start: start,
                end: end
            }
        }
     

       
       