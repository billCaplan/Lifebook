class Api::LikesController < ApplicationController

  def new

  end

  def index
    @likes = Like.all.order('"created_at" DESC')
  end

  def create
    @like = Like.new(like_params)

    @like.author_id = current_user.id

    if @like.save
      @likes = Like.all
      render :create
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

    def show
      @like = Like.find(params[:id])
    end

    def destroy
     @like = Like.find(params[:id])
     @like.destroy
     @likes = Like.all
     render :index
    end

  private

  def like_params
    params.require(:like).permit(
      :post_id, :like_type
    )
  end


end
