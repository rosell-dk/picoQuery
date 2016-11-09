# Usecases

### Usecase: picoQuery is your "jQuery" for render-blocking scripts
There are times, when you want some of your script to manipulate the document before its displayed. This means that you will want you script to load, parse and execute very quickly. Its blocking the page rendering. People are waiting! Fastest load-time is achieved by keeping your script small and inlining it directly in the HTML. Fast parsing is also achieved by keeping the script small. To keep the script small, you of course need to move all the code that can be defered into another script. That defered script can use jQuery without noticable penalty, but you cannot afford to use jQuery for the render-blocking scripting. If you love the expressiveness and how quickly you get things done in jQuery, you will experience a loss. If you are optimizing a site that already uses jQuery, you will experience plain tediousness. But ta-dah, not anymore. You can now turn to picoQuery, as you can build your own little picoQuery, which suits your needs, and it will be very small. As the render-blocking scripting you need to do is probably limited, it is not too big a drawback that picoQuery currently only supports a small subset of jQuery.

They say that you should avoid render-blocking scripts, but actually, when your script can get the job done quickly, you here have a tool to increase the overall performance of your site. Imagine the unlikely case that you want to display the current time in the top of the document. Dynamic content is much more expensive for the server than static content. Say that you do it in a Wordpress theme - you will then effectively have ruined the possibility to use page caching, which is one of the most effective ways to boost up the speed of a Wordpress site. Also, browsers cannot be allowed to cache the page either. But push the job to the client, and your servers will serve you well. Using cookies, you can maintain sessions and store things such as the content of a shopping cart.

### Usecase: Limiting bandwith usage on mobile browsers
jQuery is quite a download (37k compressed). If you want to be friendly to your mobile users, and you do not have too much coding to do, you may want to do everything in picoQuery. Or you may perhaps be able to limit jQuery usage to some pages. 

### Future usecase: Run jQuery plugins on picoQuery
When more API is supported, it will be possible to run jQuery plugins on picoQuery. To ease this process, you can use the feature-detect tool which logs the jQuery methods used in an application real-time. When your application requires multiple plugins, you will be able to merge build ids with a new tool.

### Future usecase: Vanilla versions of jQuery plugins
When more API is supported, it will be possible for plugin developers to create a vanilla version of their jQuery plugin, by bundling their plugin with with picoQuery (using the .noConflict() method)

