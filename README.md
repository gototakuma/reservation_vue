# 美容院予約システム
![スクリーンショット 2020-05-09 16.36.22.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/abac4073-1549-7658-310e-be57f7cd620f.png)

## 作成理由
このアプリを作成、Vueを選択理由は2点あります。
1つめとして、友人の問題解消に役立てたかったからです。今まで電話でやりとりし、紙に記入して予約内容を取りまとめていたそうです。<br>
仕事中の電話対応で時間がとられたり、記入ミスや紛失の恐れ。<br>
様々な問題をデジタル化し、自動化することで業務量を減らしたいと思い作成しました。
2つめとして、Vueを選定した理由なのですが、美容院ということもありフロントのデザイン性にも力を入れたいと思いVueでの作成を選びました。<br>
モダンなデザイン、UI・UXを意識して設計し、友人にもみて触ってもらっときは大変喜んでおり満足のいく結果となりました。<br>

## 機能概要
ユーザー(お客さん)と管理者(お店)での大きく2つに分けて機能がわかれます。<br>
プログラムの処理としては、<br>
フロント→Vue<br>
バックエンド→Ruby<br>
でサーバー別にし、APIを読み込んで処理を行っています。


## ユーザー(お客さん)
主な機能として<br>
・ユーザー情報編集<br>
・予約<br>
・予約の確認<br>
の上記3点になります。

### 予約画面
![スクリーンショット 2020-05-09 16.50.59.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/8f3cd21c-6f54-349f-f3d4-e447846c2c40.png)
・担当スタッフ<br>
・日時<br>
・コース(カット、パーマ、カラー...)<br>
などを選択後予約ボタンで予約が可能になります。<br>
<br>
記入項目に不備がある場合は
![スクリーンショット 2020-05-09 16.55.17.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/5e1c7051-54c7-e1c2-9e49-2c68d310989b.png)
赤文字で上部にメッセージを記載する仕様になっています。<br>

### 予約確認画面
![スクリーンショット 2020-05-09 16.59.15.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/4a881d56-8300-e750-38bd-835dadf53c26.png)
こちらでは<br>
・当日の予約確認<br>
・日付検索による予約確認<br>
が可能になっています。
![スクリーンショット 2020-05-09 17.02.23.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/30d4070c-3b6f-d3e4-838c-fea338b5de64.png)
当日・検索結果含め、予約情報がない場合は文字列を返ます。

##管理者(お店側)
主な機能は<br>
・スタッフ作成・編集・削除<br>
・ユーザー作成<br>
・ユーザー一覧・予約歴取得<br>
・全体の予約確認<br>
の上4点になります。

### ユーザー一覧・予約歴
![スクリーンショット 2020-05-09 17.13.46.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/a0adaf17-2ada-725c-3491-5950a75d8a00.png)
上にユーザー一覧情報<br>
下にユーザーの予約履歴一覧を表示します。<br>
ユーザー一覧の名前をクリックして、下の予約履歴を随時更新して切り替えれるようになっています。
### 予約一覧確認画面
![スクリーンショット 2020-05-09 17.16.51.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/64bb9eaf-e8b4-7bdf-b0c1-e789ba815deb.png)
ここではカレンダー表示を元に全体の予約を表示しています。<br>
![スクリーンショット 2020-05-09 17.18.40.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/de6b5102-a9ae-5184-546b-334afa34b25c.png)
詳細をみるには表記されている予約情報クリックすると閲覧出来ます。<br>
<br>
![スクリーンショット 2020-05-09 17.20.41.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/429158/caf2d287-80df-edcd-da0c-4c1e5f4e3ba2.png)

当日や週間ごとに時間単位でみやすくできるよう、画面右上の月間部分を変更すると時間別に並んで閲覧できる画面に切り替わります。<br>
こちらも月間表示同様にクリックで詳細閲覧は可能です。
