class Api::ImagesController < ApplicationController
  def index
   @images = Image.all
   render :index
 end

 def create
   @image = Image.new(image_params)
   
   @image.owner_id = current_user.id

   if @image.save
     render :create
   else
   end
 end

 private

 def image_params
   params.require(:image).permit(:image_path, :owner_id)
 end
end
