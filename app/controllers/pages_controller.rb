class PagesController < ApplicationController
    def new
    end

    # TODO: create a new post from the params
    def create
        year = params[:page][:'endOn(1i)'].to_i
        month = params[:page][:'endOn(2i)'].to_i
        day = params[:page][:'endOn(3i)'].to_i
        hour = params[:page][:'endOn(4i)'].to_i
        min = params[:page][:'endOn(5i)'].to_i
        dateTime = Time.zone.local(year, month, day, hour, min)
        render plain: dateTime
        # exceptDate = params[:page]
        # exceptDate.push(dateTime)
        # render plain: params[:page].inspect
        # @page = Pages.new(exceptDate)
        # @page.save
        # redirect_to @page
    end
end
